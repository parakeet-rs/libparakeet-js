import type { WASM_ptr, size_t } from './wasm';

export interface UtilsTcTea {
  tc_tea_encrypt(ptr_input: WASM_ptr, len_input: size_t, key: string): WASM_ptr;
  tc_tea_decrypt(ptr_input: WASM_ptr, len_input: size_t, key: string): WASM_ptr;
}
