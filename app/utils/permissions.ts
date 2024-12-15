import { Utils, Permissions } from '@nativescript/core';

export async function requestAudioPermissions(): Promise<boolean> {
  try {
    if (Utils.isAndroid) {
      const audioPermission = android.Manifest.permission.RECORD_AUDIO;
      const granted = await Permissions.requestPermission(audioPermission);
      return granted;
    } else if (Utils.isIOS) {
      // iOS requires permission for speech recognition and microphone
      const micPermission = await Permissions.requestPermission('microphone');
      const speechPermission = await Permissions.requestPermission('speech');
      return micPermission && speechPermission;
    }
    return false;
  } catch (error) {
    console.error('Error requesting permissions:', error);
    return false;
  }
}