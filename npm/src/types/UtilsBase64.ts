import type { WASM_ptr, size_t } from './wasm';

export interface UtilsBase64 {
  base64_encode_str(input: string): string;
  base64_decode_str(input: string): string;

  base64_encode(ptr_input: WASM_ptr, len_input: size_t): WASM_ptr;
  base64_decode(ptr_input: WASM_ptr, len_input: size_t): WASM_ptr;
}
