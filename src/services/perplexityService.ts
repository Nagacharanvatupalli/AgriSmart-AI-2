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
                        content: `You are an expert agricultural consultant. Give "gunshot" answers—short, direct, and actionable. EXTREME BREVITY IS REQUIRED. If the user asks for a price, return ONLY the price or a very short sentence. DO NOT include citations, footnotes, or bracketed numbers like [1], [2], etc. Respond in ${languageName}.`
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

        const systemText = `You are an elite agricultural pathologist. Analyze this crop image. Identify the plant and detect diseases/pests. Provide a direct diagnosis and a short, actionable treatment plan. BE CONCISE. Use clear headings. DO NOT include citations or bracketed numbers. Respond in ${languageName}.`;

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
