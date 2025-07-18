import { GoogleGenAI } from '@google/genai';

class GeminiService {
  constructor() {
    const envApiKey = import.meta.env?.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    this.apiKey = envApiKey;

    if (!this.apiKey || this.apiKey === 'your_gemini_api_key_here') {
      console.warn('Gemini API key missing! Please set it in .env or localStorage.');
      this.genAI = null;
      return;
    }

    try {
      this.genAI = new GoogleGenAI({ apiKey: this.apiKey });
      // Update genAI name to newer version
    } catch (err) {
      console.error('Error initializing Gemini API:', err);
      this.genAI = null;
    }
  }

  isConfigured() {
    return !!this.apiKey && this.apiKey !== 'your_gemini_api_key_here';
  }

  setApiKey(apiKey) {
    if (!apiKey) {
      console.error('API key is empty');
      return;
    }
    this.apiKey = apiKey;
    this.genAI = new GoogleGenAI({ apiKey: apiKey });
  }

  async generateText(prompt) {
    if (!this.genAI) {
      throw new Error(`Gemini API is not configured. Current genAI state: ${this.genAI}`);
    }
    try {
      const response = await this.genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      // Remove the extra await for result.response
      return response.text;
    } catch (error) {
      console.error('Error generating text:', error);
      throw error;
    }
  }

  async generateTextStream(prompt) {
    if (!this.genAI) {
      throw new Error(`Gemini API is not configured. Current genAI state: ${this.genAI}`);
    }
    try {
      const response = await this.genAI.models.generateContentStream({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      return response
    } catch (error) {
      console.error('Error generating text stream:', error);
      throw error;
    }
  }
}

export default new GeminiService();