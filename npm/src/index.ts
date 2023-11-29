import LibParakeetInit, { LibParakeet } from './libparakeet';
import { Parakeet } from './wrapper/Parakeet';
export * from './types';
export * as factory from './factory';
export * as bufferHelper from './utils/bufferHelper';
export { Transformer } from './utils/Transformer';
export { QMCv2FooterParser } from './wrapper/QMCv2FooterParser';
export { BlobSink, createArrayBufferReader } from './utils/ArrayBufferBridge';
export { Parakeet } from './wrapper/Parakeet';
export { ParakeetFactory } from './wrapper/ParakeetFactory';

export { LibParakeetInit };

let libParakeetPromise: Promise<LibParakeet>;

/**
 * Load LibParakeet (WASM exposed APIs)
 * @param moduleArgs Check out the WASM source for init options
 * @returns
 */
export function loadLibParakeet(moduleArgs?: Record<string, unknown>) {
  return (libParakeetPromise ||= LibParakeetInit(moduleArgs));
}

/**
 * Fetch a new Parakeet wrapper class instance.
 * @param mod If not provided, it will be loaded from WASM
 * @param moduleArgs Check out the WASM source for init options
 * @returns Wrapper class of Parakeet.
 */
export async function fetchParakeet(mod?: LibParakeet, moduleArgs?: Record<string, unknown>): Promise<Parakeet> {
  return new Parakeet(mod ?? (await loadLibParakeet(moduleArgs)));
}

export function getSDKVersion() {
  const libParakeetCryptoVersion = 'libparakeet: __BUILD_LIB_PARAKEET_CRYPTO__';
  const libParakeetAudioVersion = 'libparakeet-audio: __BUILD_LIB_PARAKEET_AUDIO__';
  return `__BUILD_SDK_VERSION__ (${libParakeetCryptoVersion}, ${libParakeetAudioVersion})`;
}
