<template>
  <div class="space-y-2">
    <div class="flex justify-between items-center">
      <label class="block text-sm font-medium text-gray-700">Hasil Transkrip:</label>
      <button
        @click="toggleEditMode"
        class="text-sm text-blue-600 hover:text-blue-800"
        :title="isEditing ? 'Selesai edit' : 'Edit teks'"
      >
        {{ isEditing ? 'Selesai' : 'Edit' }}
      </button>
    </div>
    
    <div class="relative">
      <textarea
        v-model="localText"
        class="w-full h-32 p-3 border rounded-lg transition-colors"
        :class="textareaClasses"
        :readonly="!isEditing"
        placeholder="Hasil teks akan muncul di sini..."
      ></textarea>
      
      <div class="absolute top-2 right-2 space-x-2">
        <button
          v-if="localText && isEditing"
          @click="handleReset"
          class="text-gray-500 hover:text-gray-700 text-sm"
          title="Reset ke teks asli"
        >
          Reset
        </button>
        <button
          v-if="localText"
          @click="handleClear"
          class="text-gray-500 hover:text-gray-700 text-sm"
          title="Hapus teks"
        >
          Hapus
        </button>
      </div>
    </div>

    <div v-if="isEditing" class="text-sm text-gray-500 italic">
      Anda dapat mengedit teks secara manual untuk memperbaiki hasil pengenalan suara
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:text'])

const isEditing = ref(false)
const localText = ref(props.text)

// Update local text when prop changes (for speech recognition updates)
watch(() => props.text, (newValue) => {
  if (!isEditing.value) {
    localText.value = newValue
  }
})

// Emit changes when local text is modified
watch(localText, (newValue) => {
  emit('update:text', newValue)
})

const textareaClasses = computed(() => ({
  'bg-gray-50': !isEditing.value,
  'bg-white': isEditing.value,
  'focus:ring-2 focus:ring-blue-200': isEditing.value
}))

const toggleEditMode = () => {
  isEditing.value = !isEditing.value
}

const handleReset = () => {
  localText.value = props.text
}

const handleClear = () => {
  localText.value = ''
}
</script>