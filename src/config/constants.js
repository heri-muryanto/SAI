// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://192.168.88.24:5000',
  ENDPOINTS: {
    PROCESS: '/process'
  }
}

// Voice Recognition Configuration
export const VOICE_CONFIG = {
  LANGUAGE: 'id-ID',
  ERROR_MESSAGES: {
    'no-speech': 'Tidak ada suara yang terdeteksi',
    'audio-capture': 'Tidak dapat mengakses mikrofon',
    'not-allowed': 'Izin mikrofon ditolak',
    'network': 'Kesalahan jaringan',
    'aborted': 'Perekaman dibatalkan',
    'service-not-allowed': 'Layanan tidak diizinkan',
    'browser-not-supported': 'Pengenalan suara tidak didukung di browser ini',
    'default': 'Terjadi kesalahan yang tidak diketahui'
  }
}