// Speech recognition service using Eleven Labs API

// WARNING: For demo purposes only. In a production environment:
// 1. This API key should be stored securely on the server side
// 2. Client should make requests to your backend, which then calls Eleven Labs
// 3. Never expose API keys in client-side code

// This is a placeholder for the API key that should be replaced with proper server-side implementation
const ELEVEN_LABS_API_KEY = import.meta.env.VITE_ELEVEN_LABS_API_KEY || '';

interface SpeechToTextResponse {
  text: string;
  error?: string;
}

/**
 * Converts speech to text using Eleven Labs API
 * @param audioBlob - Blob containing audio data
 * @returns Promise with transcribed text
 */
export const convertSpeechToText = async (audioBlob: Blob): Promise<SpeechToTextResponse> => {
  try {
    if (!ELEVEN_LABS_API_KEY) {
      return { 
        text: '', 
        error: 'API key not found. Please set VITE_ELEVEN_LABS_API_KEY in your environment variables.'
      };
    }

    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');
    formData.append('model_id', 'whisper-1');

    const response = await fetch('https://api.elevenlabs.io/v1/speech-recognition', {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVEN_LABS_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Eleven Labs API error:', errorData);
      return { text: '', error: `API error: ${response.status}` };
    }

    const data = await response.json();
    return { text: data.text || '' };
  } catch (error) {
    console.error('Speech recognition error:', error);
    return { text: '', error: 'Failed to transcribe audio' };
  }
};

/**
 * Starts recording audio from the user's microphone
 * @returns Object with methods to control recording
 */
export const startRecording = () => {
  let mediaRecorder: MediaRecorder | null = null;
  let audioChunks: Blob[] = [];

  const start = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };
      
      mediaRecorder.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
      throw new Error('Could not access microphone');
    }
  };

  const stop = (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      if (!mediaRecorder) {
        reject(new Error('Recording never started'));
        return;
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        audioChunks = [];
        
        // Stop all tracks in the stream
        if (mediaRecorder?.stream) {
          mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
        
        resolve(audioBlob);
      };

      mediaRecorder.stop();
    });
  };

  return { start, stop };
};
