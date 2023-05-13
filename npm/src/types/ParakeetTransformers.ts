import type { IReadSeekableImpl, IWriteableImpl } from './ParakeetInterface';
import type { PARAKEET_CRYPTO_HANDLE } from './wasm';

export enum TransformResult {
  OK = 0,
  ERROR_OTHER = 1,
  ERROR_INSUFFICIENT_OUTPUT = 2,
  ERROR_INVALID_FORMAT = 3,
  ERROR_INVALID_KEY = 4, // Failed to decrypt content, etc.
  ERROR_INSUFFICIENT_INPUT = 5,
  ERROR_IO_OUTPUT_UNKNOWN = 6,
  ERROR_NOT_IMPLEMENTED = 0xff,
}

export interface TransformerAPI {
  transformer_get_name(handle: PARAKEET_CRYPTO_HANDLE): string;
  transformer_transform(handle: PARAKEET_CRYPTO_HANDLE, dst: IWriteableImpl, src: IReadSeekableImpl): TransformResult;
  transformer_delete(handle: PARAKEET_CRYPTO_HANDLE): void;
}
