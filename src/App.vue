<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <div class="flex justify-center items-center gap-8 mb-8">
          <a href="https://vitejs.dev" target="_blank" 
             class="transition-transform hover:scale-110 duration-300">
            <img src="/vite.svg" class="w-24 h-24" alt="Vite logo" />
          </a>
          <a href="https://vuejs.org/" target="_blank" 
             class="transition-transform hover:scale-110 duration-300">
            <img src="./assets/vue.svg" class="w-24 h-24" alt="Vue logo" />
          </a>
        </div>
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Vue 3 + Vite + Tailwind</h1>
        <p class="text-lg text-gray-600">A modern development setup for building amazing apps</p>
      </div>
      
      <div class="max-w-4xl mx-auto">
        <HelloWorld msg="Welcome to your Vue 3 + Vite + Tailwind setup!" />
      </div>
    </div>
  </div>
</template>