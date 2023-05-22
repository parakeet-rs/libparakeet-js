import type { PARAKEET_CRYPTO_HANDLE } from './wasm';

export interface ParakeetCryptoNetease {
  create_ncm(key: string): PARAKEET_CRYPTO_HANDLE;
}
