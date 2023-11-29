import type { PARAKEET_CRYPTO_HANDLE, WASM_ptr } from './wasm';

export interface ParakeetCryptoQingTingFM {
  create_qtfm_by_key(name: string, secret_key: WASM_ptr): PARAKEET_CRYPTO_HANDLE;
  create_qtfm_by_device_id(
    name: string,
    filename: string,
    product: string,
    device: string,
    manufacturer: string,
    brand: string,
    board: string,
    model: string,
  ): PARAKEET_CRYPTO_HANDLE;
}
