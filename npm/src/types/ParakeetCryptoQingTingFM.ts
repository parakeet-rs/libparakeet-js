import type { PARAKEET_CRYPTO_HANDLE } from './wasm';

export interface QingTingDeviceInfo {
  product: string;
  device: string;
  manufacturer: string;
  brand: string;
  board: string;
  model: string;
}

export interface ParakeetCryptoQingTingFM {
  create_qtfm_by_key(name: string, secret_key: string): PARAKEET_CRYPTO_HANDLE;
  create_qtfm_by_device_id(
    filename: string,
    product: string,
    device: string,
    manufacturer: string,
    brand: string,
    board: string,
    model: string,
  ): PARAKEET_CRYPTO_HANDLE;
  qtfm_to_device_key(
    product: string,
    device: string,
    manufacturer: string,
    brand: string,
    board: string,
    model: string,
  ): string;
}
