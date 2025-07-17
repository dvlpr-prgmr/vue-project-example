import { GoogleGenAI } from '@google/genai';

class GeminiService {
  constructor() {
    const envApiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const localApiKey = localStorage.getItem('gemini_api_key');
    this.apiKey = envApiKey || localApiKey;

    if (!this.apiKey || this.apiKey === 'your_gemini_api_key_here') {
      console.warn('Gemini API key missing! Please set it in localStorage.');
      this.genAI = null;
      this.model = null;
      return;
    }

    try {
      this.genAI = new GoogleGenAI(this.apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    } catch (err) {
      console.error('Error initializing Gemini API:', err);
      this.genAI = null;
      this.model = null;
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
    localStorage.setItem('gemini_api_key', apiKey);
    this.genAI = new GoogleGenAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generateText(prompt) {
    if (!this.model) {
      throw new Error(`Gemini API is not configured. Current model state: ${this.model}`);
    }
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
    if (!this.model) {
      throw new Error(`Gemini API is not configured. Current model state: ${this.model}`);
    }
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
