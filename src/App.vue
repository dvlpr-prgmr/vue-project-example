<script setup>
import { ref, onMounted } from 'vue'
import Navigation from './components/Navigation.vue'
import ProjectForm from './components/ProjectForm.vue'
import GeminiChat from './components/GeminiChat.vue'
import ApiKeySetup from './components/ApiKeySetup.vue'

const hasApiKey = ref(false)
const activeTab = ref('chat')

const checkApiKey = () => {
  const storedKey = localStorage.getItem('gemini_api_key')
  const envKey = import.meta.env.VITE_GEMINI_API_KEY
  hasApiKey.value = !!(storedKey || envKey)
}

const handleApiKeySaved = (apiKey) => {
  hasApiKey.value = true
}

const resetApiKey = () => {
  localStorage.removeItem('gemini_api_key')
  hasApiKey.value = false
}

const handleNavigation = (tab) => {
  activeTab.value = tab
}

onMounted(() => {
  checkApiKey()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
    <!-- Navigation -->
    <Navigation 
      v-if="hasApiKey"
      :active-tab="activeTab"
      @navigate="handleNavigation"
    />
    
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div v-if="!hasApiKey" class="text-center mb-8">
        <div class="flex justify-center items-center gap-4 mb-6">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <h1 class="text-4xl font-bold text-gray-800">Vue 3 + Gemini AI</h1>
            <p class="text-lg text-gray-600 mt-2">Powered by Google's Gemini AI</p>
          </div>
        </div>
        
        <div v-if="hasApiKey" class="flex justify-center">
          <button
            @click="resetApiKey"
            class="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Change API Key
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-6xl mx-auto" :class="{ 'mt-8': hasApiKey }">
        <ApiKeySetup 
          v-if="!hasApiKey" 
          @api-key-saved="handleApiKeySaved"
        />
        <div v-else>
          <GeminiChat v-if="activeTab === 'chat'" />
          <ProjectForm v-if="activeTab === 'project'" />
        </div>
      </div>

      <!-- Features Section -->
      <div v-if="hasApiKey && activeTab === 'chat'" class="max-w-4xl mx-auto mt-12">
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">Features</h3>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="text-center p-4">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
                </svg>
              </div>
              <h4 class="font-semibold text-gray-800 mb-2">Real-time Chat</h4>
              <p class="text-gray-600 text-sm">Interactive conversations with Gemini AI</p>
            </div>
            
            <div class="text-center p-4">
              <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h6a2 2 0 002-2V3a2 2 0 012 2v6h-3a4 4 0 01-4 4H8a4 4 0 01-4-4V5z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h4 class="font-semibold text-gray-800 mb-2">Project Management</h4>
              <p class="text-gray-600 text-sm">Track projects, activities, and solutions</p>
            </div>
            
            <div class="text-center p-4">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h4 class="font-semibold text-gray-800 mb-2">Secure</h4>
              <p class="text-gray-600 text-sm">API keys stored locally in your browser</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
