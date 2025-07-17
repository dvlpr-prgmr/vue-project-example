<template>
  <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
    <div class="text-center mb-8">
      <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">API Key Required</h2>
      <p class="text-gray-600">Please set up your Google Gemini API key to continue</p>
    </div>

    <div class="space-y-6">
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 class="font-semibold text-blue-800 mb-2">How to get your API key:</h3>
        <ol class="text-blue-700 text-sm space-y-1 list-decimal list-inside">
          <li>Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" class="underline hover:text-blue-800">Google AI Studio</a></li>
          <li>Sign in with your Google account</li>
          <li>Click "Create API Key"</li>
          <li>Copy the generated API key</li>
          <li>Paste it in the field below</li>
        </ol>
      </div>

      <div>
        <label for="apiKey" class="block text-sm font-medium text-gray-700 mb-2">
          Gemini API Key
        </label>
        <div class="relative">
          <input
            id="apiKey"
            v-model="apiKey"
            :type="showKey ? 'text' : 'password'"
            placeholder="Enter your Gemini API key..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
          />
          <button
            type="button"
            @click="showKey = !showKey"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <svg v-if="showKey" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
            </svg>
          </button>
        </div>
      </div>

      <button
        @click="saveApiKey"
        :disabled="!apiKey.trim()"
        class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
      >
        Save API Key
      </button>

      <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 class="font-medium text-gray-800 mb-2">⚠️ Security Note</h4>
        <p class="text-gray-600 text-sm">
          Your API key is stored locally in your browser and is never sent to any server other than Google's Gemini API. 
          For production applications, consider using environment variables or a secure backend.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['api-key-saved'])

const apiKey = ref('')
const showKey = ref(false)

const saveApiKey = () => {
  if (apiKey.value.trim()) {
    localStorage.setItem('gemini_api_key', apiKey.value.trim())
    emit('api-key-saved', apiKey.value.trim())
  }
}
</script>