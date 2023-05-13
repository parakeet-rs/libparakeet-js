import type { PARAKEET_CRYPTO_HANDLE } from './wasm';

export interface ParakeetFooterParser {
  qmcv2_footer_parser_new(seed: number, enc_v2_key_1: string, enc_v2_key_2: string): PARAKEET_CRYPTO_HANDLE;
  qmcv2_footer_parser_delete(handle: PARAKEET_CRYPTO_HANDLE): void;
}
