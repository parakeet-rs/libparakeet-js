import type { PARAKEET_CRYPTO_HANDLE } from './wasm';

export interface ParakeetCryptoKuwo {
  create_kuwo(key: string): PARAKEET_CRYPTO_HANDLE;
}
