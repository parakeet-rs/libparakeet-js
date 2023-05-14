import { LibParakeet } from '../index';
import { withBuffer } from '../utils/bufferHelper';
import { ParakeetFactory } from './ParakeetFactory';

export class Parakeet {
  constructor(public readonly mod: LibParakeet) {}

  make = new ParakeetFactory(this.mod);

  detectAudioExtension(buffer: ArrayBuffer | ArrayLike<number>) {
    return withBuffer(this.mod, buffer, (ptr, len) => this.mod.detect_audio_type(ptr, len));
  }
}
