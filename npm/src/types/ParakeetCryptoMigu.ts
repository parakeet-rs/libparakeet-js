import type { PARAKEET_CRYPTO_HANDLE } from './wasm';

export interface ParakeetCryptoMigu {
  create_migu3d(salt: string, file_key: string): PARAKEET_CRYPTO_HANDLE;
  create_migu3d_keyless(): PARAKEET_CRYPTO_HANDLE;
}
