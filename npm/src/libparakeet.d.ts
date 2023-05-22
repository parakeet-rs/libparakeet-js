import type { DummyTest } from './types/DummyTest';
import type { ParakeetAudio } from './types/ParakeetAudio';
import type { WithExportedPureInterfaces } from './types/ParakeetInterface';
import type { ParakeetFooterParser } from './types/ParakeetQMCFooterParser';
import type { TransformerAPI } from './types/ParakeetTransformers';
import type { WASMExportedRuntime } from './types/wasm';

import type { ParakeetCryptoQMC } from './types/ParakeetCryptoQMC';
import type { ParakeetCryptoQRC } from './types/ParakeetCryptoQRC';
import type { ParakeetCryptoTransparent } from './types/ParakeetCryptoTransparent';
import type { ParakeetCryptoXimalayaAndroid } from './types/ParakeetCryptoXimalayaAndroid';
import type { ParakeetCryptoNetease } from './types/ParakeetCryptoNetease';
import type { ParakeetCryptoKGM } from './types/ParakeetCryptoKGM';
import type { ParakeetCryptoKuwo } from './types/ParakeetCryptoKuwo';

export type LibParakeet = WASMExportedRuntime &
  WithExportedPureInterfaces &
  ParakeetFooterParser &
  ParakeetCryptoQRC &
  ParakeetCryptoQMC &
  ParakeetCryptoTransparent &
  ParakeetCryptoXimalayaAndroid &
  ParakeetCryptoNetease &
  ParakeetCryptoKGM &
  ParakeetCryptoKuwo &
  ParakeetAudio &
  TransformerAPI &
  DummyTest;
export default function LibParakeetInit(): Promise<LibParakeet>;
