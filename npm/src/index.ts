import LibParakeetInit, { LibParakeet } from './libparakeet';
export { BlobSink, createArrayBufferReader } from './utils/ArrayBufferBridge';
export { LibParakeetInit };

let libParakeetPromise: Promise<LibParakeet>;
export function loadLibParakeet() {
  return (libParakeetPromise ||= LibParakeetInit());
}
