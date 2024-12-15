import { ref } from 'vue'
import { VOICE_CONFIG } from '../config/constants'

export function useVoiceRecognition() {
  const isRecording = ref(false)
  const transcribedText = ref('')
  const error = ref('')
  
  let recognition = null

  const getErrorMessage = (errorType) => {
    return VOICE_CONFIG.ERROR_MESSAGES[errorType] || VOICE_CONFIG.ERROR_MESSAGES.default
  }

  const initializeRecognition = () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognition) {
        throw new Error(VOICE_CONFIG.ERROR_MESSAGES['browser-not-supported'])
      }

      recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = VOICE_CONFIG.LANGUAGE

      recognition.onresult = (event) => {
        let finalTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          }
        }
        if (finalTranscript) {
          transcribedText.value += (transcribedText.value ? ' ' : '') + finalTranscript
        }
      }

      recognition.onerror = (event) => {
        error.value = `Kesalahan: ${getErrorMessage(event.error)}`
        stopRecording()
      }

    } catch (err) {
      error.value = err.message
    }
  }

  const startRecording = () => {
    error.value = ''
    if (!recognition) {
      initializeRecognition()
    }
    
    try {
      recognition.start()
      isRecording.value = true
    } catch (err) {
      error.value = 'Gagal memulai perekaman'
      console.error(err)
    }
  }

  const stopRecording = () => {
    if (recognition) {
      recognition.stop()
      isRecording.value = false
    }
  }

  return {
    isRecording,
    transcribedText,
    error,
    startRecording,
    stopRecording
  }
}