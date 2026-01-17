
import { GoogleGenAI, Type } from "@google/genai";
import { SmartGoalData, SmartGoalResult } from "../types";

const API_KEY = process.env.API_KEY || "";

export const generateSmartGoal = async (data: SmartGoalData): Promise<SmartGoalResult> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const studentName = data.studentName || "[Öğrenci Adı]";
  const classLevel = data.classLevel || "Belirtilmedi";
  
  const prompt = `
    Sen uzman bir eğitim koçusun. Bir öğretmen, öğrencisi ${studentName} (${classLevel}) ile karşı karşıya oturup bir gelişim görüşmesi yapacak.
    Öğretmenin bu görüşmede kullanabileceği, "çaba" ve "gelişim odaklı zihniyet" (growth mindset) vurgusu yapan bir SMART Koçluk Rehberi hazırla.
    
    Girdiler:
    Genel Hedef: ${data.generalGoal}
    Beklenen Sonuç: ${data.expectedResult}
    
    Lütfen şu JSON yapısında yanıt ver:
    {
      "specific": "Hedefin net tanımı (Öğrenciyle mutabık kalınacak şekilde)",
      "measurable": "Gelişimi nasıl kutlayacağımız (Sadece rakam değil, çabanın kanıtları)",
      "achievable": "Neden başarabileceğine dair motivasyonel destek",
      "relevant": "Bu hedefin öğrencinin hayalleri/geleceği ile bağı",
      "timeBound": "Zaman planı ve küçük adımlar",
      "coachingStatement": "Öğrenciye doğrudan söylenecek, çabayı takdir eden ve ona inandığını gösteren 2-3 cümlelik koçluk mesajı",
      "effortEmphasis": "Öğrencinin sonuca değil, sürece odaklanması için hangi 'çaba' göstergelerine bakmalıyız?",
      "coachingQuestions": ["Öğrenciye sorulacak 1. açık uçlu soru", "2. soru", "3. soru"],
      "actionSteps": ["İlk küçük adım", "Sürekli çaba gerektiren 2. adım", "Takip adımı"]
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 32768 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          specific: { type: Type.STRING },
          measurable: { type: Type.STRING },
          achievable: { type: Type.STRING },
          relevant: { type: Type.STRING },
          timeBound: { type: Type.STRING },
          coachingStatement: { type: Type.STRING },
          effortEmphasis: { type: Type.STRING },
          coachingQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          actionSteps: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["specific", "measurable", "achievable", "relevant", "timeBound", "coachingStatement", "effortEmphasis", "coachingQuestions", "actionSteps"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const chatWithGemini = async (message: string, history: any[] = []) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: 'Sen öğretmenler için SMART hedef oluşturma ve eğitim koçluğu konusunda uzman bir asistansın. Çaba odaklı geri bildirim verme konusunda rehberlik et.',
    },
  });
  const response = await chat.sendMessage({ message });
  return response.text;
};

export const searchEducationalStrategies = async (query: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `${query} için öğrenci motivasyonu ve çaba odaklı eğitim stratejileri nelerdir?`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  const text = response.text;
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  
  return { text, sources };
};
