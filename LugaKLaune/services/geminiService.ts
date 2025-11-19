
import { GoogleGenAI, Chat } from '@google/genai';
import { Product } from '../types';

const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

export const isGeminiConfigured = () =>
  Boolean(GEMINI_API_KEY && GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY');

const getAI = () => {
  if (!ai) {
    if (!isGeminiConfigured()) {
      console.error('API_KEY is not set in services/geminiService.ts');
      throw new Error('API_KEY is not set. Please add your key.');
    }
    ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY, vertexai: true });
  }
  return ai;
};

export const startChat = (products: Product[]) => {
  const productList = products.map(p => `- ${p.name} (${p.category}, $${p.price.toFixed(2)})`).join('\n');
  
  const systemInstruction = `You are 'ChicBot', a friendly and highly knowledgeable AI fashion stylist for 'Luga K Launey?', a luxury fashion e-commerce store. Your goal is to provide personalized and inspiring fashion advice to help users find the perfect items.

You have access to the following list of available products:
${productList}

Your main tasks are:
1.  **Give Style Advice:** Answer questions about what to wear for occasions, how to style items, and current trends.
2.  **Recommend Products:** Based on user requests, recommend specific products from the list above. Mention them by name.
3.  **Be Conversational and Engaging:** Maintain a warm, encouraging, and sophisticated tone. Use fashion-forward language.
4.  **Keep it concise:** Provide helpful but brief responses.

Example interaction:
User: "What should I wear to a summer wedding?"
You: "For a summer wedding, a Silk Evening Gown would be absolutely breathtaking! You could pair it with elegant Diamond Stud Earrings for a touch of sparkle. It's a classic and sophisticated choice."

Do not make up products. Only refer to items from the provided list.`;

  const aiInstance = getAI();
  chat = aiInstance.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    },
  });
};

export const sendMessageToAI = async (message: string): Promise<AsyncGenerator<string>> => {
  if (!chat) {
    throw new Error('Chat not initialized. Call startChat first.');
  }

  try {
    const result = await chat.sendMessageStream({ message });
    
    async function* streamGenerator(): AsyncGenerator<string> {
      for await (const chunk of result) {
        yield chunk.text ?? '';
      }
    }
    
    return streamGenerator();

  } catch (error) {
    console.error('Error sending message to Gemini:', error);
    throw new Error('Failed to get a response from the fashion assistant.');
  }
};

