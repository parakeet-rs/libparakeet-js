import type { LibParakeet, PARAKEET_CRYPTO_HANDLE } from '../index';
import { readSizedBuffer, withBuffer } from '../utils/bufferHelper';

export class QMCv2KeyCrypto {
  private _handle: PARAKEET_CRYPTO_HANDLE;
  constructor(private mod: LibParakeet, seed: number, enc_v2_key_1: string, enc_v2_key_2: string) {
    this._handle = mod.qmcv2_key_crypto_new(seed, enc_v2_key_1, enc_v2_key_2);
  }

  get handle() {
    return this._handle;
  }

  delete() {
    this.mod.qmcv2_key_crypto_delete(this._handle);
  }

  decrypt(buffer: ArrayBuffer | ArrayLike<number>) {
    return withBuffer(this.mod, buffer, (ptr, len) => {
      const ptr_result = this.mod.qmcv2_key_crypto_decrypt(this._handle, ptr, len);
      return readSizedBuffer(this.mod, ptr_result);
    });
  }

  encrypt(buffer: ArrayBuffer | ArrayLike<number>, version: 1 | 2 = 1) {
    return withBuffer(this.mod, buffer, (ptr, len) => {
      const ptr_result = this.mod.qmcv2_key_crypto_encrypt(this._handle, ptr, len, version);
      return readSizedBuffer(this.mod, ptr_result);
    });
  }
}
