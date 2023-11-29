import type { DummyTest } from './types/DummyTest';
import type { ParakeetAudio } from './types/ParakeetAudio';
import type { WithExportedPureInterfaces } from './types/ParakeetInterface';
import type { ParakeetFooterParser } from './types/ParakeetQMCFooterParser';
import type { TransformerAPI } from './types/ParakeetTransformers';
import type { WASMExportedRuntime } from './types/wasm';

import type { ParakeetCryptoKGM } from './types/ParakeetCryptoKGM';
import type { ParakeetCryptoKuwo } from './types/ParakeetCryptoKuwo';
import type { ParakeetCryptoMigu } from './types/ParakeetCryptoMigu';
import type { ParakeetCryptoNetease } from './types/ParakeetCryptoNetease';
import type { ParakeetCryptoQMC } from './types/ParakeetCryptoQMC';
import type { ParakeetCryptoQRC } from './types/ParakeetCryptoQRC';
import type { ParakeetCryptoQingTingFM } from './types/ParakeetCryptoQingTingFM';
import type { ParakeetCryptoTransparent } from './types/ParakeetCryptoTransparent';
import type { ParakeetCryptoXimalayaAndroid } from './types/ParakeetCryptoXimalayaAndroid';
import type { ParakeetQMC2KeyCrypto } from './types/ParakeetQMCKeyCrypto';

export type { QingTingDeviceInfo } from './types/ParakeetCryptoQingTingFM';

import type { UtilsBase64 } from './types/UtilsBase64';
import type { UtilsTcTea } from './types/UtilsTcTea';

export type LibParakeet = WASMExportedRuntime &
  WithExportedPureInterfaces &
  ParakeetFooterParser &
  ParakeetQMC2KeyCrypto &
  ParakeetCryptoQRC &
  ParakeetCryptoQMC &
  ParakeetCryptoTransparent &
  ParakeetCryptoXimalayaAndroid &
  ParakeetCryptoNetease &
  ParakeetCryptoKGM &
  ParakeetCryptoKuwo &
  ParakeetCryptoMigu &
  ParakeetCryptoQingTingFM &
  ParakeetAudio &
  TransformerAPI &
  UtilsBase64 &
  UtilsTcTea &
  DummyTest;

export default function LibParakeetInit(moduleArg?: Record<string, unknown>): Promise<LibParakeet>;
