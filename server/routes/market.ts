import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import MarketPrice from '../models/MarketPrice';
import { authMiddleware } from '../middleware/authMiddleware';

dotenv.config();

const router = express.Router();
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

// User must be logged in to access market data
router.get('/prices', authMiddleware, async (req, res) => {
    const { crop, market } = req.query;

    if (!crop || !market) {
        return res.status(400).json({ message: 'Crop and market/district are required' });
    }

    try {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        // Fetch today's records for this commodity using Case-Insensitive regex
        const todaysRecords = await MarketPrice.find({
            commodity: { $regex: new RegExp(`^${crop}$`, 'i') },
            date: { $gte: startOfToday }
        }).sort({ date: -1 });

        // Check if we already fetched for this specific primary market today
        const hasPrimaryToday = todaysRecords.some((r: any) =>
            r.is_primary_cache === true &&
            (r.market.toLowerCase().includes((market as string).toLowerCase()) ||
                (r.district && r.district.toLowerCase().includes((market as string).toLowerCase())))
        );

        if (hasPrimaryToday && todaysRecords.length > 0) {
            console.log('[MARKET API] Returning cached market data from DB for today.');

            // Format to match expected API output without hitting Perplexity
            const processedResults = await Promise.all(todaysRecords.slice(0, 3).map(async (dbRecord: any) => {
                const dbPreviousPrice = await MarketPrice.findOne({
                    commodity: { $regex: new RegExp(`^${dbRecord.commodity}$`, 'i') },
                    market: { $regex: new RegExp(`^${dbRecord.market}$`, 'i') },
                    date: { $lt: startOfToday }
                }).sort({ date: -1 });

                const previousModalPrice = (dbPreviousPrice && dbPreviousPrice.modal_price > 0)
                    ? dbPreviousPrice.modal_price
                    : dbRecord.yesterday_modal_price;

                let percentageChange = 0;
                if (previousModalPrice && previousModalPrice > 0) {
                    percentageChange = ((dbRecord.modal_price - previousModalPrice) / previousModalPrice) * 100;
                }

                return {
                    commodity: dbRecord.commodity,
                    market: dbRecord.market,
                    district: dbRecord.district,
                    state: dbRecord.state,
                    is_primary: dbRecord.is_primary_cache || false,
                    min_price: dbRecord.min_price || 0,
                    max_price: dbRecord.max_price || 0,
                    modal_price: dbRecord.modal_price || 0,
                    yesterday_modal_price: previousModalPrice || 0,
                    date: dbRecord.date.toISOString().split('T')[0],
                    source: dbRecord.source || 'Agmarknet Admin',
                    previous_modal_price: previousModalPrice || null,
                    previous_date: dbPreviousPrice ? dbPreviousPrice.date.toISOString().split('T')[0] : 'Yesterday/Previous',
                    percentage_change: percentageChange.toFixed(2),
                    actual_trend: percentageChange > 0 ? 'up' : percentageChange < 0 ? 'down' : 'stable'
                };
            }));

            return res.json(processedResults);
        }

        if (!PERPLEXITY_API_KEY) {
            return res.status(500).json({ message: 'Perplexity API key is missing on server' });
        }
        const query = `Get the latest real-time market prices for "${crop}" in "${market}" APMC/market in India.
        Also, find and include prices for at least 2 other NEAREST neighboring APMCs/markets to "${market}" for the same commodity.
        For each market (the primary one and the 2 neighbors), find the historical modal price from exactly yesterday.
        Crucially, divide the price data into distinct price points. Find or estimate the prices PER 100 KG (PER QUINTAL).
        Provide the data in a strict JSON array format, where each object has these fields:
        {
            "commodity": "string",
            "market": "string",
            "is_primary": "boolean (true for ${market}, false for neighbors)",
            "state": "string",
            "district": "string",
            "min_price": "number (minimum price per 100kg)",
            "max_price": "number (maximum price per 100kg)",
            "modal_price": "number (most common price per 100kg today)",
            "yesterday_modal_price": "number (most common price per 100kg exactly yesterday)",
            "date": "string (YYYY-MM-DD)",
            "source": "string"
        }
        Return ONLY the raw array of JSON objects without backticks or markdown formatting.`;

        const response = await axios.post(
            'https://api.perplexity.ai/chat/completions',
            {
                model: 'sonar',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a precise data extractor for agricultural market prices. You provide only raw JSON data based on terminal search results from Agmarknet or official sources.'
                    },
                    {
                        role: 'user',
                        content: query
                    }
                ],
                temperature: 0.1,
            },
            {
                headers: {
                    'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const rawContent = response.data.choices[0].message.content;
        let jsonPayload = null;
        let marketResults = null;

        try {
            const startIndex = rawContent.indexOf('[');
            const endIndex = rawContent.lastIndexOf(']');

            if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
                jsonPayload = rawContent.substring(startIndex, endIndex + 1);
                marketResults = JSON.parse(jsonPayload);
            } else {
                throw new Error('No array brackets found in response');
            }
        } catch (e) {
            console.error('[MARKET API] JSON Parse Error:', e);
            console.error('[MARKET API] Problematic String:', jsonPayload || rawContent);
            return res.status(500).json({ message: 'Error parsing market data list' });
        }

        if (marketResults && Array.isArray(marketResults)) {

            const processedResults = await Promise.all(marketResults.map(async (rawData: any) => {
                const currentData = {
                    ...rawData,
                    min_price: parseFloat(rawData.min_price) || 0,
                    max_price: parseFloat(rawData.max_price) || 0,
                    modal_price: parseFloat(rawData.modal_price) || 0,
                    yesterday_modal_price: parseFloat(rawData.yesterday_modal_price) || 0
                };

                let currentDate = new Date(currentData.date);
                if (isNaN(currentDate.getTime())) {
                    currentDate = new Date();
                }

                const trueStartOfToday = new Date();
                trueStartOfToday.setHours(0, 0, 0, 0);

                // Store each market record case-insensitively so it aligns with cache correctly
                await MarketPrice.findOneAndUpdate(
                    {
                        commodity: { $regex: new RegExp(`^${currentData.commodity}$`, 'i') },
                        market: { $regex: new RegExp(`^${currentData.market}$`, 'i') },
                        date: {
                            $gte: new Date(new Date(currentDate).setHours(0, 0, 0, 0)),
                            $lt: new Date(new Date(currentDate).setHours(23, 59, 59, 999))
                        }
                    },
                    { ...currentData, date: currentDate, is_primary_cache: currentData.is_primary },
                    { upsert: true, returnDocument: 'after' }
                );

                // Fetch previous record from DB for this market explicitly before today
                const dbPreviousPrice = await MarketPrice.findOne({
                    commodity: { $regex: new RegExp(`^${currentData.commodity}$`, 'i') },
                    market: { $regex: new RegExp(`^${currentData.market}$`, 'i') },
                    date: { $lt: trueStartOfToday }
                }).sort({ date: -1 });

                const previousModalPrice = (dbPreviousPrice && dbPreviousPrice.modal_price > 0)
                    ? dbPreviousPrice.modal_price
                    : currentData.yesterday_modal_price;

                let percentageChange = 0;
                if (previousModalPrice && previousModalPrice > 0) {
                    percentageChange = ((currentData.modal_price - previousModalPrice) / previousModalPrice) * 100;
                }

                return {
                    ...currentData,
                    previous_modal_price: previousModalPrice || null,
                    previous_date: dbPreviousPrice ? dbPreviousPrice.date.toISOString().split('T')[0] : 'Yesterday/Previous',
                    percentage_change: percentageChange.toFixed(2),
                    actual_trend: percentageChange > 0 ? 'up' : percentageChange < 0 ? 'down' : 'stable'
                };
            }));

            res.json(processedResults);
        } else {
            console.error('[MARKET API] Invalid array format:', rawContent);
            res.status(500).json({ message: 'Failed to parse market data list' });
        }
    } catch (error: any) {
        console.error('Market API Error:', error.response?.data || error.message);
        res.status(500).json({ message: 'Error fetching market prices' });
    }
});

export default router;
