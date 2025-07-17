import { GoogleGenAI } from '@google/genai';

class GeminiService {
  constructor() {
    // Ambil API key dari ENV atau localStorage sebagai fallback
    const envApiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const localApiKey = localStorage.getItem('gemini_api_key');

    this.apiKey = envApiKey || localApiKey;

    if (!this.apiKey || this.apiKey === 'your_gemini_api_key_here') {
      console.warn('Gemini API key missing! Please set it in localStorage.');
      // Jangan throw error biar app tidak crash
      this.genAI = null;
      this.model = null;
      return;
    }

    // Inisialisasi Gemini API
    try {
      this.genAI = new GoogleGenAI(this.apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    } catch (err) {
      console.error('Error initializing Gemini API:', err);
      this.genAI = null;
      this.model = null;
    }
  }

  /**
   * Cek apakah API key sudah dikonfigurasi dengan benar
   */
  isConfigured() {
    return !!this.apiKey && this.apiKey !== 'your_gemini_api_key_here';
  }

  /**
   * Set API key manual (misalnya dari user input)
   * @param {string} apiKey
   */
  setApiKey(apiKey) {
    if (!apiKey) {
      console.error('API key is empty');
      return;
    }
    this.apiKey = apiKey;
    localStorage.setItem('gemini_api_key', apiKey); // Simpan ke localStorage untuk runtime
    this.genAI = new GoogleGenAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  /**
   * Generate teks dari prompt
   * @param {string} prompt
   * @returns {Promise<string>}
   */
  async generateText(prompt) {
    if (!this.model) {
      throw new Error('Gemini API is not configured.');
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

  /**
   * Stream hasil teks dari prompt
   * @param {string} prompt
   * @returns {Promise<ReadableStream>}
   */
  async generateTextStream(prompt) {
    if (!this.model) {
      throw new Error('Gemini API is not configured.');
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
      
