import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

console.log('🎯 Netlify Build ENV:', process.env.VITE_GEMINI_API_KEY);
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
})
