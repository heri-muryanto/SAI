<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div class="p-8">
        <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">SIMGOS AI</h1>
        
        <div class="space-y-6">
          <div class="flex justify-center">
            <button
              @click="toggleRecording"
              :class="[
                'px-6 py-3 rounded-full font-semibold text-white transition-colors',
                isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
              ]"
            >
              {{ isRecording ? 'Hentikan Rekaman' : 'Mulai Rekaman' }}
            </button>
          </div>

          <div v-if="isRecording" class="text-center text-gray-600">
            <div class="animate-pulse">Sedang Merekam...</div>
          </div>

          <!-- Komponen TranscriptEditor -->
          <TranscriptEditor
            v-model:text="transcribedText"
          />

          <!-- Tombol Kirim -->
          <div class="flex justify-center">
            <button
              @click="handleSendText"
              :disabled="!transcribedText || isLoading"
              :class="[
                'px-6 py-2 rounded-md font-semibold text-white transition-colors',
                (!transcribedText || isLoading) 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600'
              ]"
            >
              <span v-if="isLoading">Mengirim...</span>
              <span v-else>Kirim</span>
            </button>
          </div>

          <!-- Komponen Response Display -->
          <ResponseDisplay
            :response="apiResponse"
            :error="apiError"
          />

          <div v-if="error" class="text-red-500 text-sm text-center">
            {{ error }}
          </div>

          <div class="text-sm text-gray-500 text-center">
            <p>Catatan: Pastikan browser Anda mendukung pengenalan suara dan izin mikrofon diberikan.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useVoiceRecognition } from './composables/useVoiceRecognition'
import { useApiService } from './composables/useApiService'
import ResponseDisplay from './components/ResponseDisplay.vue'
import TranscriptEditor from './components/TranscriptEditor.vue'

const {
  isRecording,
  transcribedText,
  error,
  startRecording,
  stopRecording
} = useVoiceRecognition()

const {
  isLoading,
  apiError,
  apiResponse,
  sendText
} = useApiService()

const toggleRecording = () => {
  if (isRecording.value) {
    stopRecording()
  } else {
    startRecording()
  }
}

const handleSendText = async () => {
  if (transcribedText.value) {
    await sendText(transcribedText.value)
  }
}
</script>