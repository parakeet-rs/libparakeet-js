import { IWriteableImpl } from './ParakeetInterface';
import { IReadSeekableImpl } from './ParakeetInterface';
import type { WASM_ptr, PARAKEET_CRYPTO_HANDLE } from './wasm';

export * from './c-interfaces/ReaderWriter';

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
  delete(): void;
  isDeleted(): boolean;
}

export interface ExtendableCInterface<NAME, T> {
  extend(name: NAME | string, proto: T): { new (): T & WASMCInterface };
  implement(proto: T): T & WASMCInterface;
}

export interface WithExportedPureInterfaces {
  IReadSeekable: ExtendableCInterface<'IReadSeekable', IReadSeekableImpl>;
  IWriteable: ExtendableCInterface<'IWriteable', IWriteableImpl>;
}
