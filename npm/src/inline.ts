import { loadLibParakeet } from './index';

const parakeetWasmDataURI = 'data:application/octet-stream;base64,__BASE64_LIBPARAKEET_WASM_FILE__';
export async function initLibParakeetInline(moduleArg?: Record<string, unknown>) {
  return loadLibParakeet({
    locateFile: () => parakeetWasmDataURI,
    ...moduleArg,
  });
}
