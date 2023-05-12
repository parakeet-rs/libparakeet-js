import type { DummyTest } from './types/DummyTest';
import type { ParakeetCryptoQMC } from './types/ParakeetCryptoQMC';
import type { ParakeetCryptoQRC } from './types/ParakeetCryptoQRC';
import type { ParakeetCryptoTransparent } from './types/ParakeetCryptoTransparent';
import type { WithInterfaceIReadSeekable } from './types/ParakeetInterface';
import type { WASMExportedRuntime } from './types/wasm';

export type LibParakeet = WASMExportedRuntime &
  WithInterfaceIReadSeekable &
  ParakeetCryptoQRC &
  ParakeetCryptoQMC &
  ParakeetCryptoTransparent &
  DummyTest;
export default function LibParakeetInit(): Promise<LibParakeet>;
