import LibParakeetInit, { LibParakeet } from './libparakeet';
export * from './types';
export * as factory from './factory';
export * as bufferHelper from './utils/bufferHelper';
export { Transformer } from './utils/Transformer';
export { QMCv2FooterParser } from './utils/QMCv2FooterParser';
export { BlobSink, createArrayBufferReader } from './utils/ArrayBufferBridge';
export { LibParakeetInit };

let libParakeetPromise: Promise<LibParakeet>;
export function loadLibParakeet() {
  return (libParakeetPromise ||= LibParakeetInit());
}

export function getSDKVersion() {
  return '__BUILD_SDK_VERSION__ (libparakeet: __BUILD_LIB_PARAKEET__)';
}
