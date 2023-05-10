import type { PARAKEET_CRYPTO_HANDLE } from './wasm';

export interface ParakeetCryptoQRC {
  create_qrc(qmc_v1: PARAKEET_CRYPTO_HANDLE, key1: string, key2: string, key3: string): PARAKEET_CRYPTO_HANDLE;
}
