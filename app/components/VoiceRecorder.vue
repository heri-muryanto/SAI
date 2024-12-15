<template>
  <StackLayout class="voice-recorder">
    <Button
      :text="isRecording ? 'Stop Recording' : 'Start Recording'"
      :class="isRecording ? 'btn-danger' : 'btn-primary'"
      @tap="toggleRecording"
    />
    <Label :text="recordingStatus" class="status-label" />
  </StackLayout>
</template>

<script lang="ts">
import { startRecording, stopRecording } from '../utils/audioRecording';

export default {
  name: 'VoiceRecorder',
  data() {
    return {
      isRecording: false,
      recordingStatus: 'Ready to record'
    };
  },
  methods: {
    async toggleRecording() {
      if (this.isRecording) {
        const audioData = await stopRecording();
        this.isRecording = false;
        this.recordingStatus = 'Recording stopped';
        this.$emit('recordingUpdated', audioData);
      } else {
        await startRecording();
        this.isRecording = true;
        this.recordingStatus = 'Recording in progress...';
      }
    }
  }
};
</script>

<style scoped>
.voice-recorder {
  margin: 16;
}
.status-label {
  margin-top: 8;
  text-align: center;
}
</style>