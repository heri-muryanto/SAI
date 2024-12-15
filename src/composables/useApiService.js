import { ref } from 'vue'
import { API_CONFIG } from '../config/constants'

export function useApiService() {
  const isLoading = ref(false)
  const apiError = ref('')
  const apiResponse = ref('')

  const sendText = async (text) => {
    if (!text.trim()) {
      apiError.value = 'Teks tidak boleh kosong'
      return
    }

    isLoading.value = true
    apiError.value = ''
    apiResponse.value = ''

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROCESS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
      })

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }

      const data = await response.json()
      apiResponse.value = data.result || data.message || JSON.stringify(data)
    } catch (error) {
      apiError.value = `Gagal mengirim data: ${error.message}`
      console.error('API Error:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    apiError,
    apiResponse,
    sendText
  }
}