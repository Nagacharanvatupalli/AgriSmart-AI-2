import axios from 'axios';

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

export const getPerplexityAdvice = async (query: string) => {
    if (!PERPLEXITY_API_KEY) {
        console.error("Perplexity API key is missing");
        throw new Error("Perplexity API key is missing");
    }

    try {
        const response = await axios.post(
            'https://api.perplexity.ai/chat/completions',
            {
                model: 'sonar',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert agricultural consultant. Provide practical, sustainable, and scientifically-backed advice to farmers. Use your search capabilities to provide the most up-to-date information on weather patterns, market prices, and pest outbreaks. Keep responses concise and actionable.'
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

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error calling Perplexity API:", error);
        throw error;
    }
};

export const detectCropDisease = async (base64Image: string, mimeType: string) => {
    if (!PERPLEXITY_API_KEY) {
        throw new Error("Perplexity API key is missing");
    }

    try {
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
                                text: 'You are an elite agricultural pathologist. Analyze this crop image. Identify the plant, detect any diseases, pests, or nutrient deficiencies. Provide a precise diagnosis and a detailed, actionable treatment plan. Use your search capabilities to verify the latest and most effective sustainable treatments. Format the response in professional Markdown with clear headings.'
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
