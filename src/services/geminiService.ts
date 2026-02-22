import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeCropImage = async (base64Image: string, mimeType: string) => {
  const model = "gemini-3-flash-preview";
  const prompt = "Analyze this crop image. Identify the plant, detect any diseases, pests, or nutrient deficiencies. Provide a clear diagnosis and actionable recommendations for treatment and prevention. Format the response in Markdown.";

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

export const getAgriculturalAdvice = async (query: string, context?: string) => {
  const model = "gemini-3-flash-preview";
  const systemInstruction = "You are an expert agricultural consultant. Provide practical, sustainable, and scientifically-backed advice to farmers. Focus on crop management, soil health, irrigation, and pest control. Keep responses concise and actionable.";

  const response = await ai.models.generateContent({
    model,
    contents: query,
    config: {
      systemInstruction,
    },
  });

  return response.text;
};

export const getSeasonalInsights = async (location: string, month: string) => {
  const model = "gemini-3-flash-preview";
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
