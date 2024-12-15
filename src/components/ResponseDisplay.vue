<template>
  <div v-if="response || error" class="mt-4 p-4 rounded-lg border">
    <div v-if="error" class="text-red-500 mb-2">
      {{ error }}
    </div>
    <div v-if="response" class="prose">
      <h3 class="text-lg font-medium text-gray-900 mb-2">Hasil Pemrosesan:</h3>
      <p class="text-gray-700">{{ response }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  response: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  }
})
</script>