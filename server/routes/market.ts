import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import MarketPrice from '../models/MarketPrice';
import { authMiddleware } from '../middleware/authMiddleware';

dotenv.config();

const router = express.Router();
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

// Official data.gov.in API for APMC market prices
const DATA_GOV_API_KEY = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';
const DATA_GOV_RESOURCE_ID = '9ef84268-d588-465a-a308-a864a43d0070';

// Mapping local crop names to Agmarknet commodity names for better accuracy
const COMMODITY_MAP: { [key: string]: string } = {
    "Dry Chillies": "Chilli Red",
    "Chili Red": "Chilli Red",
    "Soybean": "Soyabean",
    "Paddy(Basmati)": "Paddy(Dhan)(Basmati)",
    "Paddy(Common)": "Paddy(Dhan)(Common)",
    "Corn": "Maize",
    "Ajwain Husk": "Ajwan",
    "Meal Maker (Soya Chunks)": "Soyabean",
    "Ginger(Dry)": "Ginger(Dry)",
    "Ginger(Green)": "Ginger(Green)",
    "Turmeric": "Turmeric",
    "Cotton": "Cotton",
    "Wheat": "Wheat",
    "Rice": "Rice",
    "Pulse": "Arhar (Tur/Red Gram)(Whole)"
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to check MongoDB for recently fetched data (today)
async function checkRecentCache(crop: string, market: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    try {
        const cached = await MarketPrice.find({
            commodity: crop,
            date: { $gte: today, $lte: endOfDay }
        }).sort({ is_primary: -1 }); // Primary market first

        if (cached && cached.length > 0) {
            // Check if our specific market is in the results
            const hasPrimary = cached.some(m => m.market.toLowerCase() === market.toLowerCase());
            if (hasPrimary) return cached;
        }
    } catch (err) {
        console.log('[MARKET API] Cache check failed:', err);
    }
    return null;
}

// Fetch from official data.gov.in API with smart fallbacks (Market -> District -> State)
async function fetchFromDataGov(crop: string, searchLocation: string, retryCount = 0): Promise<any[] | null> {
    const searchCrop = COMMODITY_MAP[crop] || crop;

    const fetchWithFilter = async (filterKey: string, filterValue: string) => {
        try {
            const url = `https://api.data.gov.in/resource/${DATA_GOV_RESOURCE_ID}`;
            const response = await axios.get(url, {
                params: {
                    'api-key': DATA_GOV_API_KEY,
                    format: 'json',
                    limit: 50,
                    'filters[commodity]': searchCrop,
                    [`filters[${filterKey}]`]: filterValue
                },
                timeout: 15000
            });
            return response.data?.records;
        } catch (err: any) {
            if (err.response?.status === 429) {
                throw err; // Let the outer wrapper handle the retry natively
            }
            console.log(`[MARKET API] data.gov.in fetch failed for ${filterKey}=${filterValue}:`, err.message);
            return null;
        }
    };

    try {
        // Try 1: Exact matches as Market Name
        let records = await fetchWithFilter('market', searchLocation);

        // Try 2: Matches as District Name
        if (!records || records.length === 0) {
            records = await fetchWithFilter('district', searchLocation);
        }

        // Try 3: Matches as State Name
        if (!records || records.length === 0) {
            records = await fetchWithFilter('state', searchLocation);
        }

        if (!records || !Array.isArray(records) || records.length === 0) {
            return null;
        }

        // Transform data.gov.in format to our app format
        const results = records.map((r: any, index: number) => ({
            commodity: crop, // Keep original app name for consistency
            market: r.market || searchLocation,
            is_primary: index === 0,
            state: r.state || '',
            district: r.district || '',
            grade1_price: parseFloat(r.max_price || r.modal_price) || 0,
            grade2_price: parseFloat(r.modal_price) || 0,
            grade3_price: parseFloat(r.min_price || r.modal_price) || 0,
            min_price: parseFloat(r.min_price) || 0,
            max_price: parseFloat(r.max_price) || 0,
            modal_price: parseFloat(r.modal_price) || 0,
            date: r.arrival_date || new Date().toISOString().split('T')[0],
            historical_price_yesterday: 0,
            yesterday_modal_price: 0,
            source: 'data.gov.in (Agmarknet)'
        }));

        // Deduplicate by market name
        const seen = new Map();
        for (const r of results) {
            if (!seen.has(r.market)) seen.set(r.market, r);
        }
        const unique = Array.from(seen.values());

        // Ensure the primary logic correctly highlights the closest match if possible
        if (unique.length > 0) {
            unique.forEach(u => u.is_primary = false);
            const exactMatch = unique.find(u =>
                u.market.toLowerCase() === searchLocation.toLowerCase() ||
                u.district.toLowerCase() === searchLocation.toLowerCase()
            );
            if (exactMatch) {
                exactMatch.is_primary = true;
            } else {
                unique[0].is_primary = true;
            }
        }

        return unique;
    } catch (err: any) {
        if (err.response?.status === 429 && retryCount < 2) {
            console.log(`[MARKET API] Rate limited (429), retrying in 1s... Attempt ${retryCount + 1}`);
            await sleep(1000);
            return fetchFromDataGov(crop, searchLocation, retryCount + 1);
        }
        return null;
    }
}

// Fallback: Fetch from Perplexity AI
async function fetchFromPerplexity(crop: string, market: string): Promise<any[] | null> {
    if (!PERPLEXITY_API_KEY) return null;

    try {
        const query = `Find the latest wholesale/APMC market prices for the commodity "${crop}" at or near "${market}" market in India.
Include the primary market "${market}" and at least 2 nearby APMC markets trading "${crop}".
For each market provide 3 quality grade prices (Grade 1 = best, Grade 3 = lowest) per 100 kg (quintal).
Also include yesterday's modal price if available.

CRITICAL: You MUST respond with ONLY a valid JSON array. No explanations, no markdown, no code fences, no text before or after. If exact data is unavailable, provide your best reasonable estimate based on nearby markets and recent trends. Never return empty or non-JSON.

JSON format per object:
{"commodity":"string","market":"string","is_primary":true/false,"state":"string","district":"string","grade1_price":number,"grade2_price":number,"grade3_price":number,"modal_price":number,"date":"YYYY-MM-DD","yesterday_modal_price":number,"source":"string"}

Return ONLY the JSON array starting with [ and ending with ]. Nothing else.`;

        const systemPrompt = 'You are an agricultural market data API. You ONLY output valid JSON arrays. Never output explanations, apologies, or markdown. If exact prices are unavailable, estimate using nearby market data and recent trends. Always return a valid JSON array with at least 1 entry.';

        const makeCall = async (prompt: string, system: string) => {
            const resp = await axios.post(
                'https://api.perplexity.ai/chat/completions',
                {
                    model: 'sonar',
                    messages: [
                        { role: 'system', content: system },
                        { role: 'user', content: prompt }
                    ],
                    temperature: 0.1,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    timeout: 30000
                }
            );
            return resp.data.choices[0].message.content;
        };

        const parseJsonArray = (raw: string) => {
            try {
                const s = raw.indexOf('[');
                const e = raw.lastIndexOf(']');
                if (s !== -1 && e !== -1 && e > s) {
                    const parsed = JSON.parse(raw.substring(s, e + 1));
                    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
                }
            } catch { }
            return null;
        };

        let rawContent = await makeCall(query, systemPrompt);
        let results = parseJsonArray(rawContent);

        if (!results) {
            console.log('[MARKET API] Perplexity first attempt failed, retrying...');
            const retryQuery = `Return a JSON array of current market prices for "${crop}" near "${market}", India. Format:
[{"commodity":"${crop}","market":"${market}","is_primary":true,"state":"","district":"","grade1_price":0,"grade2_price":0,"grade3_price":0,"modal_price":0,"date":"${new Date().toISOString().split('T')[0]}","yesterday_modal_price":0,"source":"Agmarknet"}]
Fill in real or estimated values. Include 2-3 markets. Return ONLY the JSON array.`;
            rawContent = await makeCall(retryQuery, 'Output only a valid JSON array. No other text.');
            results = parseJsonArray(rawContent);
        }

        return results;
    } catch (err: any) {
        console.log('[MARKET API] Perplexity fetch failed:', err.message);
        return null;
    }
}

// User must be logged in to access market data
router.get('/prices', authMiddleware, async (req, res) => {
    const { crop, market } = req.query;

    if (!crop || !market) {
        return res.status(400).json({ message: 'Crop and market/district are required' });
    }

    try {
        console.log(`[MARKET API] Fetching prices for "${crop}" at "${market}"`);
<<<<<<< HEAD
=======

        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
>>>>>>> f7ae652df66f9b7f79fd9fed7ca55854a7aac18c

        // Step 0: Check MongoDB cache first for today's data
        const cachedResults = await checkRecentCache(crop as string, market as string);
        if (cachedResults && cachedResults.length > 0) {
            console.log(`[MARKET API] Returning cached results for ${crop}`);

            // Still need to process trends for cached results if not already there
            const processedCached = await Promise.all(cachedResults.map(async (dbRecord: any) => {
                const startOfToday = new Date();
                startOfToday.setHours(0, 0, 0, 0);

<<<<<<< HEAD
=======
        if (hasPrimaryToday && todaysRecords.length > 0) {
            console.log('[MARKET API] Returning cached market data from DB for today.');

            // Format to match expected API output without hitting Perplexity
            const processedResults = await Promise.all(todaysRecords.slice(0, 5).map(async (dbRecord: any) => {
>>>>>>> f7ae652df66f9b7f79fd9fed7ca55854a7aac18c
                const dbPreviousPrice = await MarketPrice.findOne({
                    commodity: { $regex: new RegExp(`^${dbRecord.commodity}$`, 'i') },
                    market: { $regex: new RegExp(`^${dbRecord.market}$`, 'i') },
                    date: { $lt: startOfToday }
                }).sort({ date: -1 }).catch(() => null);

                const previousModalPrice = (dbPreviousPrice && dbPreviousPrice.modal_price > 0)
                    ? dbPreviousPrice.modal_price
                    : (dbRecord.historical_price_yesterday || 0);

                let percentageChange = 0;
                if (previousModalPrice && previousModalPrice > 0) {
                    percentageChange = ((dbRecord.modal_price - previousModalPrice) / previousModalPrice) * 100;
                }

                return {
<<<<<<< HEAD
                    ...dbRecord.toObject ? dbRecord.toObject() : dbRecord,
=======
                    commodity: dbRecord.commodity,
                    market: dbRecord.market,
                    district: dbRecord.district,
                    state: dbRecord.state,
                    is_primary: dbRecord.is_primary_cache || false,
                    grade1_price: dbRecord.grade1_price || dbRecord.max_price || 0,
                    grade2_price: dbRecord.grade2_price || dbRecord.modal_price || 0,
                    grade3_price: dbRecord.grade3_price || dbRecord.min_price || 0,
                    min_price: dbRecord.min_price || 0,
                    max_price: dbRecord.max_price || 0,
                    modal_price: dbRecord.modal_price || 0,
                    yesterday_modal_price: previousModalPrice || 0,
                    date: dbRecord.date.toISOString().split('T')[0],
                    source: dbRecord.source || 'Agmarknet Admin',
>>>>>>> f7ae652df66f9b7f79fd9fed7ca55854a7aac18c
                    previous_modal_price: previousModalPrice || null,
                    previous_date: dbPreviousPrice ? dbPreviousPrice.date.toISOString().split('T')[0] : 'Yesterday/Previous',
                    percentage_change: percentageChange.toFixed(2),
                    actual_trend: percentageChange > 0 ? 'up' : percentageChange < 0 ? 'down' : 'stable'
                };
            }));

<<<<<<< HEAD
            return res.json(processedCached);
=======
            return res.json(processedResults);
        }

        // Step 0: Check MongoDB cache first for today's data (redundant with above but keeps logic safe)
        const cachedResults = await checkRecentCache(crop as string, market as string);
        if (cachedResults) {
            console.log(`[MARKET API] Returning cached results for ${crop}`);
            return res.json(cachedResults);
>>>>>>> f7ae652df66f9b7f79fd9fed7ca55854a7aac18c
        }

        // Step 1: Try official data.gov.in API first (Exact Match)
        let marketResults = await fetchFromDataGov(crop as string, market as string);
        let dataSourceLabel = 'data.gov.in (Agmarknet)';

        // Final check: If still no official data, we stop here to ensure "Real Time Official Data" requirement
        if (!marketResults || marketResults.length === 0) {
<<<<<<< HEAD
            console.log('[MARKET API] No exact match from data.gov.in, trying nearby...');
            marketResults = await fetchNearbyFromDataGov(crop as string, '');
            if (marketResults && marketResults.length > 0) {
                // Deduplicate by market name
                const seen = new Map();
                for (const r of marketResults) {
                    if (!seen.has(r.market)) {
                        seen.set(r.market, r);
                    }
                }
                const unique = Array.from(seen.values()).slice(0, 5);
                if (unique.length > 0) {
                    unique[0].is_primary = true;
                    marketResults = unique;
                }
            }
=======
            console.log('[MARKET API] No official data found for today.');
            return res.status(404).json({
                message: `No official market records found for "${crop}" at "${market}" for today.`,
                code: 'NO_OFFICIAL_DATA'
            });
>>>>>>> f7ae652df66f9b7f79fd9fed7ca55854a7aac18c
        }

        console.log(`[MARKET API] Got ${marketResults.length} results from ${dataSourceLabel}`);

<<<<<<< HEAD
        if (!marketResults || marketResults.length === 0) {
            return res.status(404).json({ message: `No market data found for ${crop} at ${market}. Try a different market or commodity.` });
        }

        console.log(`[MARKET API] Got ${marketResults.length} results from ${dataSource}`);

        // Process results: store in DB and compute trends
=======
>>>>>>> f7ae652df66f9b7f79fd9fed7ca55854a7aac18c
        const processedResults = await Promise.all(marketResults.map(async (rawData: any) => {
            const currentData = {
                ...rawData,
                grade1_price: parseFloat(rawData.grade1_price) || parseFloat(rawData.max_price) || 0,
                grade2_price: parseFloat(rawData.grade2_price) || parseFloat(rawData.modal_price) || 0,
                grade3_price: parseFloat(rawData.grade3_price) || parseFloat(rawData.min_price) || 0,
                modal_price: parseFloat(rawData.modal_price) || 0,
                yesterday_modal_price: parseFloat(rawData.yesterday_modal_price) || 0
            };

            // Parse date
            let currentDate: Date;
<<<<<<< HEAD
            if (typeof currentData.date === 'string' && currentData.date.includes('/')) {
                // Handle DD/MM/YYYY format from data.gov.in
=======
            if (currentData.date && currentData.date.includes('/')) {
>>>>>>> f7ae652df66f9b7f79fd9fed7ca55854a7aac18c
                const parts = currentData.date.split('/');
                currentDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
            } else {
                currentDate = new Date(currentData.date);
            }
            if (isNaN(currentDate.getTime())) currentDate = new Date();

            currentData.date = currentDate;

            try {
                await MarketPrice.findOneAndUpdate(
                    {
                        commodity: { $regex: new RegExp(`^${currentData.commodity}$`, 'i') },
                        market: { $regex: new RegExp(`^${currentData.market}$`, 'i') },
                        date: {
                            $gte: new Date(new Date(currentDate).setHours(0, 0, 0, 0)),
                            $lt: new Date(new Date(currentDate).setHours(23, 59, 59, 999))
                        }
                    },
<<<<<<< HEAD
                    { ...currentData, date: currentDate, is_primary_cache: currentData.is_primary },
=======
                    { ...currentData, is_primary_cache: currentData.is_primary },
>>>>>>> f7ae652df66f9b7f79fd9fed7ca55854a7aac18c
                    { upsert: true, new: true }
                );
            } catch (dbErr) {
                console.log('[MARKET API] DB store warning:', (dbErr as any).message);
            }

<<<<<<< HEAD
            // Fetch previous record from DB for trend calculation
            const dbPreviousPrice = await MarketPrice.findOne({
                commodity: { $regex: new RegExp(`^${currentData.commodity}$`, 'i') },
                market: { $regex: new RegExp(`^${currentData.market}$`, 'i') },
                date: { $lt: new Date(new Date(currentDate).setHours(0, 0, 0, 0)) }
            }).sort({ date: -1 }).catch(() => null);

            const previousModalPrice = (dbPreviousPrice && dbPreviousPrice.modal_price > 0)
                ? dbPreviousPrice.modal_price
                : (currentData.historical_price_yesterday || 0);
=======
            const trueStartOfToday = new Date();
            trueStartOfToday.setHours(0, 0, 0, 0);

            const dbPreviousPrice = await MarketPrice.findOne({
                commodity: { $regex: new RegExp(`^${currentData.commodity}$`, 'i') },
                market: { $regex: new RegExp(`^${currentData.market}$`, 'i') },
                date: { $lt: trueStartOfToday }
            }).sort({ date: -1 });

            const previousModalPrice = (dbPreviousPrice && dbPreviousPrice.modal_price > 0)
                ? dbPreviousPrice.modal_price
                : currentData.yesterday_modal_price;
>>>>>>> f7ae652df66f9b7f79fd9fed7ca55854a7aac18c

            let percentageChange = 0;
            if (previousModalPrice && previousModalPrice > 0) {
                percentageChange = ((currentData.modal_price - previousModalPrice) / previousModalPrice) * 100;
            }

            return {
                ...currentData,
                date: currentDate.toISOString().split('T')[0],
                previous_modal_price: previousModalPrice || null,
                previous_date: dbPreviousPrice ? dbPreviousPrice.date.toISOString().split('T')[0] : 'Yesterday/Previous',
                percentage_change: percentageChange.toFixed(2),
                actual_trend: percentageChange > 0 ? 'up' : percentageChange < 0 ? 'down' : 'stable'
            };
        }));

        res.json(processedResults);
    } catch (error: any) {
        console.error('Market API Error:', error.response?.data || error.message);
        res.status(500).json({ message: 'Error fetching market prices' });
    }
});

export default router;
