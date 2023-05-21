import { PARAKEET_CRYPTO_HANDLE } from '../types';
import type { LibParakeet } from '../libparakeet';
import { withBuffer } from '../utils/bufferHelper';
import { Transformer } from '../utils/Transformer';
import { QMCv2FooterParser } from '../utils/QMCv2FooterParser';
import { BlobSink, createArrayBufferReader } from '../utils/ArrayBufferBridge';

export class ParakeetFactory {
  constructor(public readonly mod: LibParakeet) {}

  WriterSink() {
    return new BlobSink(this.mod);
  }

  Reader(data: ArrayBuffer) {
    return createArrayBufferReader(data, this.mod);
  }

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

  XimalayaAndroid(mul_init: number, mul_step: number, content_key: string) {
    const p_scramble_table = this.mod.create_xmly_android_scramble_table(mul_init, mul_step);
    if (!p_scramble_table) return null;

    try {
      return new Transformer(this.mod, this.mod.create_xmly_android_transformer(p_scramble_table, content_key));
    } finally {
      this.mod.free_xmly_key(p_scramble_table);
    }
  }
}
