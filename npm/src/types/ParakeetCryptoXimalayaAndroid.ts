import type { PARAKEET_CRYPTO_HANDLE, WASM_ptr } from './wasm';

export interface ParakeetCryptoXimalayaAndroid {
  create_xmly_android_scramble_table(mul_init: number, mul_step: number): WASM_ptr;
  free_xmly_key(ptr: WASM_ptr): void;
  create_xmly_android_transformer(key: WASM_ptr, content_key: string): PARAKEET_CRYPTO_HANDLE;
}
