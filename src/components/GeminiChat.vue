<template>
  <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
      <h2 class="text-2xl font-bold text-white flex items-center gap-3">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        Gemini AI Chat
      </h2>
      <p class="text-blue-100 mt-2">Powered by Google's Gemini AI</p>
    </div>

    <!-- Chat Messages -->
    <div class="h-96 overflow-y-auto p-6 space-y-4" ref="chatContainer">
      <div v-if="messages.length === 0" class="text-center text-gray-500 py-8">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
        <p>Start a conversation with Gemini AI</p>
      </div>

      <div v-for="(message, index) in messages" :key="index" 
           :class="['flex', message.role === 'user' ? 'justify-end' : 'justify-start']">
        <div :class="[
          'max-w-xs lg:max-w-md px-4 py-2 rounded-lg',
          message.role === 'user' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 text-gray-800'
        ]">
          <div class="flex items-center gap-2 mb-1">
            <div :class="[
              'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
              message.role === 'user' ? 'bg-blue-500' : 'bg-purple-500 text-white'
            ]">
              {{ message.role === 'user' ? 'U' : 'AI' }}
            </div>
            <span class="text-xs opacity-75">
              {{ message.role === 'user' ? 'You' : 'Gemini' }}
            </span>
          </div>
          <p class="whitespace-pre-wrap">{{ message.content }}</p>
        </div>
      </div>

      <div v-if="isLoading" class="flex justify-start">
        <div class="bg-gray-100 text-gray-800 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold">
              AI
            </div>
            <span class="text-xs opacity-75">Gemini</span>
          </div>
          <div class="flex items-center gap-1 mt-2">
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="border-t bg-gray-50 p-4">
      <form @submit.prevent="sendMessage" class="flex gap-3">
        <input
          v-model="inputMessage"
          type="text"
          placeholder="Ask Gemini anything..."
          :disabled="isLoading"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          :disabled="!inputMessage.trim() || isLoading"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <svg v-if="isLoading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span v-else>Send</span>
        </button>
      </form>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 m-4">
      <div class="flex">
        <svg class="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
        <div>
          <h3 class="text-red-800 font-medium">Error</h3>
          <p class="text-red-700 text-sm mt-1">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import geminiService from '../services/gemini.js'

const messages = ref([])
const inputMessage = ref('')
const isLoading = ref(false)
const error = ref('')
const chatContainer = ref(null)

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return

  const userMessage = inputMessage.value.trim()
  inputMessage.value = ''
  error.value = ''

  // Add user message
  messages.value.push({
    role: 'user',
    content: userMessage
  })

  scrollToBottom()
  isLoading.value = true

  try {
    const response = await geminiService.generateText(userMessage)
    
    // Add AI response
    messages.value.push({
      role: 'assistant',
      content: response
    })
  } catch (err) {
    error.value = err.message || 'Failed to get response from Gemini AI'
    console.error('Error:', err)
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

const clearChat = () => {
  messages.value = []
  error.value = ''
}

onMounted(() => {
  // Add welcome message
  messages.value.push({
    role: 'assistant',
    content: 'Hello! I\'m Gemini AI. How can I help you today?'
  })
})
</script>