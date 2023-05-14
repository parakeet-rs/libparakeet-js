import type { WASM_ptr } from './wasm';

export interface ParakeetAudio {
  detect_audio_type(data_ptr: WASM_ptr, data_len: number): string;
}
