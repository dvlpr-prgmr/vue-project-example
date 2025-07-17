<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">{{ msg }}</h2>

    <div class="text-center mb-8">
      <button 
        type="button" 
        @click="count++"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
      >
        Count is {{ count }}
      </button>
      <p class="text-gray-600 mt-4">
        Edit
        <code class="bg-gray-100 px-2 py-1 rounded text-sm text-blue-600">components/HelloWorld.vue</code> 
        to test HMR
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border-l-4 border-blue-500">
        <h3 class="font-semibold text-gray-800 mb-2">🚀 Quick Start</h3>
        <p class="text-gray-600 text-sm">
          Check out
          <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
             class="text-blue-600 hover:text-blue-700 underline">create-vue</a>, 
          the official Vue + Vite starter
        </p>
      </div>

      <div class="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border-l-4 border-green-500">
        <h3 class="font-semibold text-gray-800 mb-2">💡 IDE Support</h3>
        <p class="text-gray-600 text-sm">
          Learn more about IDE Support for Vue in the
          <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
             target="_blank"
             class="text-green-600 hover:text-green-700 underline">Vue Docs Scaling up Guide</a>
        </p>
      </div>
    </div>

    <div class="mt-8 text-center">
      <p class="text-gray-500 text-sm">
        Click on the Vite and Vue logos to learn more
      </p>
    </div>
  </div>

  <div class="bg-white rounded-2xl shadow-xl p-8">
    <h3 class="text-xl font-bold text-gray-800 mb-4">🎨 Tailwind CSS Features</h3>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="bg-purple-50 p-4 rounded-lg text-center">
        <div class="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-2"></div>
        <p class="text-sm text-gray-600">Utility-first CSS</p>
      </div>
      <div class="bg-pink-50 p-4 rounded-lg text-center">
        <div class="w-12 h-12 bg-pink-500 rounded-full mx-auto mb-2"></div>
        <p class="text-sm text-gray-600">Responsive design</p>
      </div>
      <div class="bg-indigo-50 p-4 rounded-lg text-center">
        <div class="w-12 h-12 bg-indigo-500 rounded-full mx-auto mb-2"></div>
        <p class="text-sm text-gray-600">Modern components</p>
      </div>
    </div>
  </div>
</template>