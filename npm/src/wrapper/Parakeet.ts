import { LibParakeet } from '../index';
import { withBuffer } from '../utils/bufferHelper';
import { UtilsBase64 } from './Base64';
import { ParakeetFactory } from './ParakeetFactory';
import { UtilsTcTea } from './TcTea';

export class Parakeet {
  constructor(public readonly mod: LibParakeet) { }

  public readonly make = new ParakeetFactory(this.mod);
  public readonly Base64 = new UtilsBase64(this.mod);
  public readonly TcTea = new UtilsTcTea(this.mod);

  detectAudioExtension(buffer: ArrayBuffer | ArrayLike<number>) {
    return withBuffer(this.mod, buffer, (ptr, len) => this.mod.detect_audio_type(ptr, len));
  }
}
