import { GoogleGenAI } from '@google/genai';

class GeminiService {
  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      throw new Error('VITE_GEMINI_API_KEY is not set in environment variables');
    }
    this.genAI = new GoogleGenAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generateText(prompt) {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating text:', error);
      throw error;
    }
  }

  async generateTextStream(prompt) {
    try {
      const result = await this.model.generateContentStream(prompt);
      return result.stream;
    } catch (error) {
      console.error('Error generating text stream:', error);
      throw error;
    }
  }
}

export default new GeminiService();

export default new