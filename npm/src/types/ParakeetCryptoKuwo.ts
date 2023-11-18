import type { PARAKEET_CRYPTO_HANDLE, WASM_ptr } from './wasm';

export interface ParakeetCryptoKuwo {
  create_kuwo(key: string): PARAKEET_CRYPTO_HANDLE;
  create_kuwo_v2(key: string, key_v2_ptr: WASM_ptr, key_v2_len: number): PARAKEET_CRYPTO_HANDLE;
  create_kuwo_v2_ekey(
    key: string,
    ekey_ptr: WASM_ptr,
    ekey_len: number,
    key_crypto_handle: PARAKEET_CRYPTO_HANDLE,
  ): PARAKEET_CRYPTO_HANDLE;
}
