<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-800">Project Manager</span>
        </div>

        <!-- Menu Items -->
        <div class="hidden md:flex space-x-8">
          <button
            @click="$emit('navigate', 'chat')"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
              activeTab === 'chat' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            ]"
          >
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
              </svg>
              Gemini Chat
            </div>
          </button>
          
          <button
            @click="$emit('navigate', 'project')"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
              activeTab === 'project' 
                ? 'bg-green-100 text-green-700' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            ]"
          >
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h6a2 2 0 002-2V3a2 2 0 012 2v6h-3a4 4 0 01-4 4H8a4 4 0 01-4-4V5z" clip-rule="evenodd"/>
              </svg>
              Form Proyek
            </div>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 py-4">
        <div class="space-y-2">
          <button
            @click="$emit('navigate', 'chat'); mobileMenuOpen = false"
            :class="[
              'w-full text-left px-4 py-3 rounded-lg font-medium transition-colors duration-200',
              activeTab === 'chat' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            ]"
          >
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
              </svg>
              Gemini Chat
            </div>
          </button>
          
          <button
            @click="$emit('navigate', 'project'); mobileMenuOpen = false"
            :class="[
              'w-full text-left px-4 py-3 rounded-lg font-medium transition-colors duration-200',
              activeTab === 'project' 
                ? 'bg-green-100 text-green-700' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            ]"
          >
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h6a2 2 0 002-2V3a2 2 0 012 2v6h-3a4 4 0 01-4 4H8a4 4 0 01-4-4V5z" clip-rule="evenodd"/>
              </svg>
              Form Proyek
            </div>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  activeTab: {
    type: String,
    default: 'chat'
  }
})

defineEmits(['navigate'])

const mobileMenuOpen = ref(false)
</script>