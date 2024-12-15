<template>
  <StackLayout class="transcript">
    <Label text="Transcribed Text:" class="h2" />
    <TextView
      :text="text"
      editable="false"
      class="transcript-text"
    />
  </StackLayout>
</template>

<script lang="ts">
export default {
  name: 'TranscriptDisplay',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
.transcript {
  margin: 16;
}
.transcript-text {
  margin-top: 8;
  padding: 8;
  background-color: #f0f0f0;
  border-radius: 4;
}
</style>