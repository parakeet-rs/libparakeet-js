import type { IReadSeekableImpl } from './ParakeetInterface';
import type { PARAKEET_CRYPTO_HANDLE, WASM_ptr, size_t } from './wasm';

export interface ParakeetFooterParser {
  qmcv2_footer_parser_new(seed: number, enc_v2_key_1: string, enc_v2_key_2: string): PARAKEET_CRYPTO_HANDLE;
  qmcv2_footer_parser_parse_get_size(handle: PARAKEET_CRYPTO_HANDLE, src: IReadSeekableImpl): number;
  qmcv2_footer_parser_delete(handle: PARAKEET_CRYPTO_HANDLE): void;

  qmcv2_footer_parse(handle: PARAKEET_CRYPTO_HANDLE, ptr: WASM_ptr, len: size_t): PARAKEET_CRYPTO_HANDLE;
  qmcv2_footer_result_get_state(handle: PARAKEET_CRYPTO_HANDLE): number;
  qmcv2_footer_result_get_media_name(handle: PARAKEET_CRYPTO_HANDLE): string;
  qmcv2_footer_result_get_footer_size(handle: PARAKEET_CRYPTO_HANDLE): size_t;
  qmcv2_footer_result_get_ekey(handle: PARAKEET_CRYPTO_HANDLE): WASM_ptr;
  qmcv2_footer_result_delete(handle: PARAKEET_CRYPTO_HANDLE): void;
}
