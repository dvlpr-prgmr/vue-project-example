<template>
  <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-green-600 to-blue-600 p-6">
      <h2 class="text-2xl font-bold text-white flex items-center gap-3">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
        Form Proyek
      </h2>
      <p class="text-green-100 mt-2">Kelola data proyek dan kegiatan</p>
    </div>

    <!-- Form -->
    <div class="p-6">
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Tanggal -->
        <div>
          <label for="tanggal" class="block text-sm font-medium text-gray-700 mb-2">
            Tanggal <span class="text-red-500">*</span>
          </label>
          <input
            id="tanggal"
            v-model="formData.tanggal"
            type="date"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <!-- Nama Proyek -->
        <div>
          <label for="namaProyek" class="block text-sm font-medium text-gray-700 mb-2">
            Nama Proyek <span class="text-red-500">*</span>
          </label>
          <input
            id="namaProyek"
            v-model="formData.namaProyek"
            type="text"
            placeholder="Masukkan nama proyek..."
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <!-- Kegiatan -->
        <div>
          <label for="kegiatan" class="block text-sm font-medium text-gray-700 mb-2">
            Kegiatan <span class="text-red-500">*</span>
          </label>
          <textarea
            id="kegiatan"
            v-model="formData.kegiatan"
            rows="4"
            placeholder="Deskripsikan kegiatan yang dilakukan..."
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          ></textarea>
        </div>

        <!-- Solusi -->
        <div>
          <label for="solusi" class="block text-sm font-medium text-gray-700 mb-2">
            Solusi <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <textarea
              id="solusi"
              v-model="formData.solusi"
              rows="4"
              placeholder="Jelaskan solusi yang diterapkan..."
              required
              class="w-full px-4 py-3 pr-32 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            ></textarea>
            <button
              type="button"
              @click="generateSolution"
              :disabled="!formData.kegiatan.trim() || isGenerating"
              class="absolute top-2 right-2 bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
            >
              <svg v-if="isGenerating" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"/>
              </svg>
              {{ isGenerating ? 'Generating...' : 'Generate by AI' }}
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-1">
            Isi kegiatan terlebih dahulu, lalu klik "Generate by AI" untuk mendapatkan saran solusi otomatis
          </p>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4 pt-4">
          <button
            type="submit"
            class="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
          >
            Simpan Data
          </button>
          <button
            type="button"
            @click="resetForm"
            class="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>

    <!-- Success Message -->
    <div v-if="showSuccess" class="bg-green-50 border-l-4 border-green-500 p-4 m-6">
      <div class="flex">
        <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <div>
          <h3 class="text-green-800 font-medium">Berhasil!</h3>
          <p class="text-green-700 text-sm mt-1">Data proyek berhasil disimpan.</p>
        </div>
      </div>
    </div>

    <!-- Generation Error Message -->
    <div v-if="generationError" class="bg-red-50 border-l-4 border-red-500 p-4 m-6">
      <div class="flex">
        <svg class="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
        <div>
          <h3 class="text-red-800 font-medium">Error</h3>
          <p class="text-red-700 text-sm mt-1">{{ generationError }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Data List -->
  <div v-if="savedData.length > 0" class="max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow-xl overflow-hidden">
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
      <h3 class="text-xl font-bold text-white flex items-center gap-3">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
        </svg>
        Data Proyek Tersimpan
      </h3>
    </div>
    
    <div class="p-6">
      <div class="space-y-4">
        <div v-for="(item, index) in savedData" :key="index" 
             class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Tanggal</p>
              <p class="font-medium text-gray-800">{{ formatDate(item.tanggal) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Nama Proyek</p>
              <p class="font-medium text-gray-800">{{ item.namaProyek }}</p>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-sm text-gray-500">Kegiatan</p>
            <p class="text-gray-800">{{ item.kegiatan }}</p>
          </div>
          <div class="mt-4">
            <p class="text-sm text-gray-500">Solusi</p>
            <p class="text-gray-800">{{ item.solusi }}</p>
          </div>
          <div class="mt-4 flex justify-end">
            <button
              @click="deleteItem(index)"
              class="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import geminiService from '../services/gemini.js'

const formData = ref({
  tanggal: '',
  namaProyek: '',
  kegiatan: '',
  solusi: ''
})

const savedData = ref([])
const showSuccess = ref(false)
const isGenerating = ref(false)
const generationError = ref('')

const generateSolution = async () => {
  if (!formData.value.kegiatan.trim()) {
    return
  }

  isGenerating.value = true
  generationError.value = ''

  try {
    // Check if Gemini service is configured
    if (!geminiService.isConfigured()) {
      generationError.value = 'API key Gemini belum dikonfigurasi'
      return
    }

    const prompt = `Berdasarkan kegiatan proyek berikut: "${formData.value.kegiatan}"

Buatkan solusi yang praktis dan efektif untuk mengatasi tantangan atau mencapai tujuan dari kegiatan tersebut. Berikan solusi yang:
1. Spesifik dan dapat diterapkan
2. Realistis dan feasible
3. Terstruktur dengan langkah-langkah yang jelas
4. Menggunakan bahasa Indonesia

Format jawaban dalam bentuk poin-poin yang mudah dipahami.`

    const response = await geminiService.generateText(prompt)
    formData.value.solusi = response
  } catch (error) {
    generationError.value = error.message || 'Gagal menggenerate solusi'
    console.error('Error generating solution:', error)
  } finally {
    isGenerating.value = false
  }
}

const submitForm = () => {
  // Save to local storage and array
  const newData = { ...formData.value }
  savedData.value.push(newData)
  
  // Save to localStorage
  localStorage.setItem('projectData', JSON.stringify(savedData.value))
  
  // Show success message
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
  
  // Reset form
  resetForm()
}

const resetForm = () => {
  formData.value = {
    tanggal: '',
    namaProyek: '',
    kegiatan: '',
    solusi: ''
  }
}

const deleteItem = (index) => {
  savedData.value.splice(index, 1)
  localStorage.setItem('projectData', JSON.stringify(savedData.value))
}

const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

onMounted(() => {
  // Load saved data from localStorage
  const saved = localStorage.getItem('projectData')
  if (saved) {
    savedData.value = JSON.parse(saved)
  }
})
</script>