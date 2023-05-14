import LibParakeetInit, { LibParakeet } from './libparakeet';
import { Parakeet } from './wrapper/Parakeet';
export * from './types';
export * as factory from './factory';
export * as bufferHelper from './utils/bufferHelper';
export { Transformer } from './utils/Transformer';
export { QMCv2FooterParser } from './utils/QMCv2FooterParser';
export { BlobSink, createArrayBufferReader } from './utils/ArrayBufferBridge';
export { Parakeet } from './wrapper/Parakeet';
export { ParakeetFactory } from './wrapper/ParakeetFactory';

export { LibParakeetInit };

let libParakeetPromise: Promise<LibParakeet>;
export function loadLibParakeet() {
  return (libParakeetPromise ||= LibParakeetInit());
}

export async function fetchParakeet(mod?: LibParakeet): Promise<Parakeet> {
  return new Parakeet(mod ?? (await loadLibParakeet()));
}

export function getSDKVersion() {
  const libParakeetCryptoVersion = 'libparakeet: __BUILD_LIB_PARAKEET_CRYPTO__';
  const libParakeetAudioVersion = 'libparakeet-audio: __BUILD_LIB_PARAKEET_AUDIO__';
  return `__BUILD_SDK_VERSION__ (${libParakeetCryptoVersion}, ${libParakeetAudioVersion})`;
}
