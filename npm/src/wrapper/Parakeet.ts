import { LibParakeet } from '../index';
import { withBuffer } from '../utils/bufferHelper';
import { UtilsBase64 } from './Base64';
import { ParakeetFactory } from './ParakeetFactory';
import { QtfmHelper } from './QtfmHelper';
import { UtilsTcTea } from './TcTea';

export class Parakeet {
  constructor(public readonly mod: LibParakeet) {
    this.make = new ParakeetFactory(this.mod);
    this.Base64 = new UtilsBase64(this.mod);
    this.TcTea = new UtilsTcTea(this.mod);
    this.qtfm = new QtfmHelper(this.mod);
  }

  public readonly make;
  public readonly Base64;
  public readonly TcTea;
  public readonly qtfm;

  detectAudioExtension(buffer: ArrayBuffer | ArrayLike<number>) {
    return withBuffer(this.mod, buffer, (ptr, len) => this.mod.detect_audio_type(ptr, len));
  }
}
