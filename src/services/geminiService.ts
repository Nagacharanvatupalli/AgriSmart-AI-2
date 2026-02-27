import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getVisualSymptoms = async (base64Image: string, mimeType: string) => {
  const model = "gemini-2.0-flash";
  const prompt = "Act as a specialized agricultural vision system. Analyze this crop image and provide a highly detailed, objective list of visual symptoms. Focus on: leaf color changes, spot patterns (size, color, margin), stem condition, insect presence, and growth anomalies. Do NOT provide a diagnosis or treatment plan. Just describe exactly what is visible in a structured list.";

  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: mimeType,
    },
  };

  const response = await ai.models.generateContent({
    model,
    contents: { parts: [imagePart, { text: prompt }] },
  });

  return response.text;
};

// simple cache to reduce duplicate calls
const adviceCache = new Map<string, { text: string; ts: number }>();
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

const LANG_NAME: Record<string, string> = {
  en: 'English',
  te: 'Telugu',
  hi: 'Hindi',
  ta: 'Tamil'
};

export const getAgriculturalAdvice = async (query: string, context?: string, language = 'en') => {
  const model = "gemini-2.0-flash";
  const languageName = LANG_NAME[language] || 'English';
  const systemInstruction = `You are an expert agricultural consultant. Provide practical, sustainable, and scientifically-backed advice to farmers. Focus on crop management, soil health, irrigation, and pest control. Keep responses concise and actionable. Respond in ${languageName}.`;

  const cacheKey = `${language}::${query}`;
  const cached = adviceCache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return cached.text;
  }

  const response = await ai.models.generateContent({
    model,
    contents: query,
    config: {
      systemInstruction,
    },
  });

  // cache and return
  adviceCache.set(cacheKey, { text: response.text, ts: Date.now() });
  return response.text;
};

export const getSeasonalInsights = async (location: string, month: string) => {
  const model = "gemini-2.0-flash";
  const prompt = `Provide agricultural insights for ${location} during the month of ${month}. Include recommended crops to plant, common risks to watch out for, and essential maintenance tasks. Format as JSON.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recommendedCrops: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          risks: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          tasks: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          summary: { type: Type.STRING },
        },
        required: ["recommendedCrops", "risks", "tasks", "summary"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
};
