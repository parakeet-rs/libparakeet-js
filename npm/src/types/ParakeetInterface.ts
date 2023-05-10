import type { WASM_ptr } from './wasm';

export enum SeekDirection {
  SEEK_FILE_BEGIN = 0,
  SEEK_CURRENT_POSITION = 1,
  SEEK_FILE_END = 2,
}

export interface WASMCInterface {
  __parent: WASMCInterface;
  __construct: any;
  __destruct: any;
  // Remember to call parent when used
  //   __construct: function() {
  //       this.__parent.__construct.call(this);
  //   },
  //   __destruct: function() {
  //       this.__parent.__destruct.call(this);
  //   },
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

export interface WithInterfaceIReadSeekable {
  IReadSeekable: {
    extend(name: 'IReadSeekable' | string, proto: IReadSeekableImpl): { new (): IReadSeekableImpl };
    implement(proto: IReadSeekableImpl): IReadSeekableImpl;
  };

  IWriteable: {
    extend(name: 'IWriteable' | string, proto: IWriteableImpl): { new (): IWriteableImpl };
    implement(proto: IWriteableImpl): IWriteableImpl;
  };
}
