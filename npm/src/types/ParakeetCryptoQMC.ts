import type { PARAKEET_CRYPTO_HANDLE, WASM_ptr } from './wasm';

export interface ParakeetCryptoQMC {
  create_qmc_v1(key_ptr: WASM_ptr, key_len: number): PARAKEET_CRYPTO_HANDLE;
  create_qmc_v2(footer_parser_handle: PARAKEET_CRYPTO_HANDLE): PARAKEET_CRYPTO_HANDLE;

  create_qmc_v2_ekey(
    ekey_ptr: WASM_ptr,
    ekey_len: number,
    key_crypto_handle: PARAKEET_CRYPTO_HANDLE,
  ): PARAKEET_CRYPTO_HANDLE;
  create_qmc_v2_key(ekey_ptr: WASM_ptr, ekey_len: number): PARAKEET_CRYPTO_HANDLE;
}
