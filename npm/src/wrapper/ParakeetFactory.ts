import { PARAKEET_CRYPTO_HANDLE } from '../types';
import type { LibParakeet } from '../libparakeet';
import { withBuffer } from '../utils/bufferHelper';
import { Transformer } from '../utils/Transformer';
import { QMCv2FooterParser } from './QMCv2FooterParser';
import { QMCv2KeyCrypto } from './QMCv2KeyCrypto';
import { BlobSink, createArrayBufferReader } from '../utils/ArrayBufferBridge';
import type { QingTingDeviceInfo } from '../types/ParakeetCryptoQingTingFM';

export class ParakeetFactory {
  constructor(public readonly mod: LibParakeet) { }

  WriterSink() {
    return new BlobSink(this.mod);
  }

  Reader(data: ArrayBuffer) {
    return createArrayBufferReader(data, this.mod);
  }

  QRCLyrics(qmc1: PARAKEET_CRYPTO_HANDLE | Transformer, key1: string, key2: string, key3: string) {
    const qmc1Handle = qmc1 instanceof Transformer ? qmc1['handle'] : qmc1;
    return new Transformer(this.mod, this.mod.create_qrc(qmc1Handle, key1, key2, key3));
  }

  QMCv1(key: ArrayBuffer | ArrayLike<number>) {
    return withBuffer(this.mod, key, (ptr, len) => new Transformer(this.mod, this.mod.create_qmc_v1(ptr, len)));
  }

  QMCv2(footerParser: QMCv2FooterParser | PARAKEET_CRYPTO_HANDLE) {
    const footerParserHandle = footerParser instanceof QMCv2FooterParser ? footerParser.handle : footerParser;
    return new Transformer(this.mod, this.mod.create_qmc_v2(footerParserHandle));
  }

  QMCv2EKey(ekey: ArrayBuffer | ArrayLike<number>, keyCrypto: QMCv2KeyCrypto | PARAKEET_CRYPTO_HANDLE) {
    const keyCryptoHandle = keyCrypto instanceof QMCv2KeyCrypto ? keyCrypto.handle : keyCrypto;
    return withBuffer(this.mod, ekey, (ptr, len) => {
      return new Transformer(this.mod, this.mod.create_qmc_v2_ekey(ptr, len, keyCryptoHandle));
    });
  }

  QMCv2Key(ekey: ArrayBuffer | ArrayLike<number>) {
    return withBuffer(this.mod, ekey, (ptr, len) => {
      return new Transformer(this.mod, this.mod.create_qmc_v2_key(ptr, len));
    });
  }

  QMCv2FooterParser(seed: number, enc_v2_key_1: string, enc_v2_key_2: string) {
    return new QMCv2FooterParser(this.mod, seed, enc_v2_key_1, enc_v2_key_2);
  }

  QMCv2KeyCrypto(seed: number, enc_v2_key_1: string, enc_v2_key_2: string) {
    return new QMCv2KeyCrypto(this.mod, seed, enc_v2_key_1, enc_v2_key_2);
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

  NeteaseNCM(key: string) {
    return new Transformer(this.mod, this.mod.create_ncm(key));
  }

  KugouKGM(slot_key_1: string, v4_slot_key_table: string, v4_file_key_table: string) {
    return new Transformer(this.mod, this.mod.create_kgm(slot_key_1, v4_slot_key_table, v4_file_key_table));
  }

  KuwoKWM(key: string) {
    return new Transformer(this.mod, this.mod.create_kuwo(key));
  }

  KuwoKWMv2(key: string, ekey: ArrayBuffer | ArrayLike<number>, keyCrypto: QMCv2KeyCrypto | PARAKEET_CRYPTO_HANDLE) {
    const keyCryptoHandle = keyCrypto instanceof QMCv2KeyCrypto ? keyCrypto.handle : keyCrypto;
    return withBuffer(this.mod, ekey, (ptr, len) => {
      return new Transformer(this.mod, this.mod.create_kuwo_v2_ekey(key, ptr, len, keyCryptoHandle));
    });
  }

  Migu3D(salt?: string, fileKey?: string) {
    const keyless = typeof salt !== 'string' || typeof fileKey !== 'string';
    const miguTransformerHandle = keyless ? this.mod.create_migu3d_keyless() : this.mod.create_migu3d(salt, fileKey);
    return new Transformer(this.mod, miguTransformerHandle);
  }

  QingTingFM(filename: string, deviceSecret: string): Transformer;
  QingTingFM(filename: string, deviceInfo: QingTingDeviceInfo): Transformer;

  QingTingFM(filename: string, secretOrDeviceInfo: string | QingTingDeviceInfo) {
    if (typeof secretOrDeviceInfo === 'string') {
      return new Transformer(this.mod, this.mod.create_qtfm_by_key(filename, secretOrDeviceInfo));
    }

    const { product, device, manufacturer, brand, board, model } = secretOrDeviceInfo;
    return new Transformer(
      this.mod,
      this.mod.create_qtfm_by_device_id(filename, product, device, manufacturer, brand, board, model),
    );
  }
}
