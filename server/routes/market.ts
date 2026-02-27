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

    if (!PERPLEXITY_API_KEY) {
        return res.status(500).json({ message: 'Perplexity API key is missing on server' });
    }

    try {
        const query = `Get the latest real-time market prices for "${crop}" in "${market}" APMC/market in India.
        Also, find and include prices for at least 2 other NEAREST neighboring APMCs/markets to "${market}" for the same commodity.
        For each market (the primary one and the 2 neighbors), find the historical modal price from yesterday.
        Crucially, divide the price data into 3 distinct quality grades (Grade 1 being highest quality, Grade 3 being lowest). Find or estimate the prices for these grades PER 100 KG (PER QUINTAL).
        Provide the data in a strict JSON array format, where each object has these fields:
        {
            "commodity": "string",
            "market": "string",
            "is_primary": "boolean (true for ${market}, false for neighbors)",
            "state": "string",
            "district": "string",
            "grade1_price": "number (price per 100kg)",
            "grade2_price": "number (price per 100kg)",
            "grade3_price": "number (price per 100kg)",
            "modal_price": "number (price per 100kg)",
            "date": "string (YYYY-MM-DD)",
            "historical_price_yesterday": "number (price per 100kg)",
            "source": "string"
        }
        Return ONLY the array of JSON objects.`;

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
                    grade1_price: parseFloat(rawData.grade1_price) || 0,
                    grade2_price: parseFloat(rawData.grade2_price) || 0,
                    grade3_price: parseFloat(rawData.grade3_price) || 0,
                    modal_price: parseFloat(rawData.modal_price) || 0,
                    historical_price_yesterday: parseFloat(rawData.historical_price_yesterday) || 0
                };

                let currentDate = new Date(currentData.date);
                if (isNaN(currentDate.getTime())) {
                    currentDate = new Date();
                }

                // Store each market record
                await MarketPrice.findOneAndUpdate(
                    {
                        commodity: currentData.commodity,
                        market: currentData.market,
                        date: {
                            $gte: new Date(new Date(currentDate).setHours(0, 0, 0, 0)),
                            $lt: new Date(new Date(currentDate).setHours(23, 59, 59, 999))
                        }
                    },
                    { ...currentData, date: currentDate },
                    { upsert: true, returnDocument: 'after' }
                );

                // Fetch previous record from DB for this market
                const dbPreviousPrice = await MarketPrice.findOne({
                    commodity: currentData.commodity,
                    market: currentData.market,
                    date: { $lt: currentDate }
                }).sort({ date: -1 });

                const previousModalPrice = (dbPreviousPrice && dbPreviousPrice.modal_price > 0)
                    ? dbPreviousPrice.modal_price
                    : currentData.historical_price_yesterday;

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
