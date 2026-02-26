import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

router.get('/prices', async (req, res) => {
    const { crop, market } = req.query;

    if (!crop || !market) {
        return res.status(400).json({ message: 'Crop and market/district are required' });
    }

    if (!PERPLEXITY_API_KEY) {
        return res.status(500).json({ message: 'Perplexity API key is missing on server' });
    }

    try {
        const query = `Get the latest real-time market prices for "${crop}" in "${market}" APMC/market in India. 
        Provide the data in a strict JSON format with the following fields:
        {
            "commodity": "string",
            "market": "string",
            "state": "string",
            "district": "string",
            "min_price": "number",
            "max_price": "number",
            "modal_price": "number",
            "date": "string (YYYY-MM-DD)",
            "trend": "string (up/down/stable)",
            "source": "string"
        }
        Return ONLY the JSON object.`;

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

        const content = response.data.choices[0].message.content;
        // Extract JSON block if present
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const marketData = JSON.parse(jsonMatch[0]);
            res.json(marketData);
        } else {
            res.status(500).json({ message: 'Failed to parse market data from AI response' });
        }
    } catch (error: any) {
        console.error('Market API Error:', error.response?.data || error.message);
        res.status(500).json({ message: 'Error fetching market prices' });
    }
});

export default router;
