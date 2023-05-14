import { PARAKEET_CRYPTO_HANDLE, QMCv2FooterParser, Transformer } from '../index';
import type { LibParakeet } from '../libparakeet';
import { withBuffer } from '../utils/bufferHelper';

export class ParakeetFactory {
  constructor(public readonly mod: LibParakeet) {}

  QMCv1(key: ArrayBuffer | ArrayLike<number>) {
    return withBuffer(this.mod, key, (ptr, len) => new Transformer(this.mod, this.mod.create_qmc_v1(ptr, len)));
  }

  QMCv2(footerParser: QMCv2FooterParser | PARAKEET_CRYPTO_HANDLE) {
    const footerParserHandle = footerParser instanceof QMCv2FooterParser ? footerParser.handle : footerParser;
    return new Transformer(this.mod, this.mod.create_qmc_v2(footerParserHandle));
  }

  QMCv2FooterParser(seed: number, enc_v2_key_1: string, enc_v2_key_2: string) {
    return new QMCv2FooterParser(this.mod, seed, enc_v2_key_1, enc_v2_key_2);
  }

  QMCv2Map(key: ArrayBuffer | ArrayLike<number>) {
    return withBuffer(this.mod, key, (ptr, len) => new Transformer(this.mod, this.mod.create_qmc_v2_map(ptr, len)));
  }

  QMCv2RC4(key: ArrayBuffer | ArrayLike<number>) {
    return withBuffer(this.mod, key, (ptr, len) => new Transformer(this.mod, this.mod.create_qmc_v2_rc4(ptr, len)));
  }
}
