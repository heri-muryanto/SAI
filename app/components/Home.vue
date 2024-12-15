<template>
  <Page>
    <ActionBar title="Voice Input App" />
    <StackLayout class="p-4">
      <VoiceRecorder @recordingUpdated="onRecordingUpdated" />
      <TranscriptDisplay :text="transcribedText" />
      <ActionList :actions="availableActions" @actionSelected="handleAction" />
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import VoiceRecorder from './VoiceRecorder.vue';
import TranscriptDisplay from './TranscriptDisplay.vue';
import ActionList from './ActionList.vue';
import { speechToText } from '../utils/speechRecognition';

export default {
  name: 'Home',
  components: {
    VoiceRecorder,
    TranscriptDisplay,
    ActionList
  },
  data() {
    return {
      transcribedText: '',
      availableActions: [
        { id: 'clear', label: 'Clear Text' },
        { id: 'share', label: 'Share Text' }
      ]
    };
  },
  methods: {
    async onRecordingUpdated(audioData: any) {
      try {
        const text = await speechToText(audioData);
        this.transcribedText = text;
      } catch (error) {
        console.error('Speech recognition error:', error);
      }
    },
    handleAction(actionId: string) {
      switch (actionId) {
        case 'clear':
          this.transcribedText = '';
          break;
        case 'share':
          this.shareText();
          break;
      }
    },
    shareText() {
      // Implement sharing functionality
    }
  }
};
</script>