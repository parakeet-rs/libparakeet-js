import type { PARAKEET_CRYPTO_HANDLE } from './wasm';

export interface ParakeetCryptoTransparent {
  create_transparent_transformer(): PARAKEET_CRYPTO_HANDLE;
}
