import type { PARAKEET_CRYPTO_HANDLE } from './wasm';

export interface ParakeetCryptoKGM {
  create_kgm(slot_key_1: string, v4_slot_key_table: string, v4_file_key_table: string): PARAKEET_CRYPTO_HANDLE;
}
