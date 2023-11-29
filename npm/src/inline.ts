import { loadLibParakeet } from './index';

function getLibParakeetBinary() {
  const parakeetWasmDataHex = '__LIBPARAKEET_WASM_FILE_HEX__';

  const fromHexChar = (ch: number) => {
    ch |= 0;
    const offset = ch & 0b1111;
    const base = ch & 0b0100_0000 ? 9 : 0;
    return offset + base;
  };

  const buffer = new Uint8Array(parakeetWasmDataHex.length / 2);
  for (let i = 0; i < parakeetWasmDataHex.length; i += 2) {
    const hi = fromHexChar(parakeetWasmDataHex.charCodeAt(i));
    const lo = fromHexChar(parakeetWasmDataHex.charCodeAt(i + 1));
    buffer[i >> 1] = (hi << 4) | lo;
  }
  return buffer;
}

const LibParakeetBinary = getLibParakeetBinary();

export async function initLibParakeetInline(moduleArg?: Record<string, unknown>) {
  return loadLibParakeet({
    wasmBinary: LibParakeetBinary,
    ...moduleArg,
  });
}
