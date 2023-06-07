import type { PARAKEET_CRYPTO_HANDLE, WASM_ptr } from './wasm';

export interface ParakeetQMC2KeyCrypto {
  qmcv2_key_crypto_new(seed: number, enc_v2_key_1: string, enc_v2_key_2: string): PARAKEET_CRYPTO_HANDLE;
  qmcv2_key_crypto_delete(handle: PARAKEET_CRYPTO_HANDLE): void;

  qmcv2_key_crypto_encrypt(handle: PARAKEET_CRYPTO_HANDLE, ptr: WASM_ptr, len: number, version: 1 | 2): WASM_ptr;
  qmcv2_key_crypto_decrypt(handle: PARAKEET_CRYPTO_HANDLE, ptr: WASM_ptr, len: number): WASM_ptr;
  qmcv2_key_crypto_free(ptr: WASM_ptr): void;
}
