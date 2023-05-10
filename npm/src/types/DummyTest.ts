import type { IReadSeekableImpl, IWriteableImpl } from './ParakeetInterface';

export interface DummyTest {
  rw_test(dst: IWriteableImpl, src: IReadSeekableImpl): void;
}
