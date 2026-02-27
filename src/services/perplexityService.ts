import axios from 'axios';

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

// Simple in-memory cache to reduce duplicate requests and improve responsiveness
const adviceCache = new Map<string, { text: string; ts: number }>();
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

const LANG_NAME: Record<string, string> = {
    en: 'English',
    te: 'Telugu',
    hi: 'Hindi',
    ta: 'Tamil'
};

export const getPerplexityAdvice = async (query: string, language = 'en') => {
    if (!PERPLEXITY_API_KEY) {
        console.error('Perplexity API key is missing');
        throw new Error('Perplexity API key is missing');
    }

    const cacheKey = `${language}::${query}`;
    const cached = adviceCache.get(cacheKey);
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
        return cached.text;
    }

    try {
        const languageName = LANG_NAME[language] || 'English';
        const response = await axios.post(
            'https://api.perplexity.ai/chat/completions',
            {
                model: 'sonar',
                messages: [
                    {
                        role: 'system',
                        content: `You are an expert agricultural consultant. Provide practical, sustainable, and scientifically-backed advice to farmers. Use your search capabilities to provide the most up-to-date information on weather patterns, market prices, and pest outbreaks. Keep responses concise and actionable. Respond in ${languageName}.`
                    },
                    {
                        role: 'user',
                        content: query
                    }
                ],
                temperature: 0.2,
                top_p: 0.9,
                max_tokens: 1000,
            },
            {
                headers: {
                    'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const text = response.data.choices[0].message.content;
        // cache result
        adviceCache.set(cacheKey, { text, ts: Date.now() });
        return text;
    } catch (error) {
        console.error('Error calling Perplexity API:', error);
        throw error;
    }
};

export const detectCropDisease = async (base64Image: string, mimeType: string, language = 'en') => {
    if (!PERPLEXITY_API_KEY) {
        throw new Error("Perplexity API key is missing");
    }

    try {
        const languageName = LANG_NAME[language] || 'English';

        const systemText = `You are an elite agricultural pathologist. Analyze this crop image. Identify the plant, detect any diseases, pests, or nutrient deficiencies. Provide a precise diagnosis and a detailed, actionable treatment plan. Use your search capabilities to verify the latest and most effective sustainable treatments. Format the response in professional Markdown with clear headings. Respond in ${languageName}.`;

        const response = await axios.post(
            'https://api.perplexity.ai/chat/completions',
            {
                model: 'sonar',
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: systemText
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: `data:${mimeType};base64,${base64Image}`
                                }
                            }
                        ]
                    }
                ],
                temperature: 0.2,
                top_p: 0.9,
                max_tokens: 1500,
            },
            {
                headers: {
                    'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error calling Perplexity API for vision diagnosis:", error);
        throw error;
    }
};
