import type { DummyTest } from './types/DummyTest';
import type { ParakeetCryptoQMC } from './types/ParakeetCryptoQMC';
import type { ParakeetCryptoQRC } from './types/ParakeetCryptoQRC';
import type { ParakeetCryptoTransparent } from './types/ParakeetCryptoTransparent';
import type { WithExportedPureInterfaces } from './types/ParakeetInterface';
import type { ParakeetFooterParser } from './types/ParakeetQMCFooterParser';
import type { TransformerAPI } from './types/ParakeetTransformers';
import type { WASMExportedRuntime } from './types/wasm';

export type LibParakeet = WASMExportedRuntime &
  WithExportedPureInterfaces &
  ParakeetFooterParser &
  ParakeetCryptoQRC &
  ParakeetCryptoQMC &
  ParakeetCryptoTransparent &
  TransformerAPI &
  DummyTest;
export default function LibParakeetInit(): Promise<LibParakeet>;
