import { WASM_ptr } from '../wasm';

export enum SeekDirection {
  SEEK_FILE_BEGIN = 0,
  SEEK_CURRENT_POSITION = 1,
  SEEK_FILE_END = 2,
}

export interface IReadSeekableImpl {
  Read(this: IReadSeekableImpl, buffer: WASM_ptr, len: number): number;

  /**
   * @param position
   * @param seek_dir
   */
  Seek(this: IReadSeekableImpl, position: number, seek_dir: SeekDirection): void;

  GetSize(this: IReadSeekableImpl): number;
  GetOffset(this: IReadSeekableImpl): number;
}

export interface IWriteableImpl {
  Write(this: IWriteableImpl, buffer: WASM_ptr, len: number): void;
}
