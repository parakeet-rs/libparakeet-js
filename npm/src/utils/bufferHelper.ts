import type { LibParakeet, WASM_ptr } from '../index';

export function createBufferFromString(mod: LibParakeet, str: string, maxLen?: number): WASM_ptr {
  const len = maxLen ?? mod.lengthBytesUTF8(str) + 1;
  const ptr = mod._malloc(len);
  mod.stringToUTF8(str, ptr, len);
  return ptr;
}

export function createBuffer(
  mod: LibParakeet,
  buffer: ArrayLike<number> | ArrayBuffer
): [WASM_ptr, number, () => void] {
  if (buffer instanceof ArrayBuffer) {
    return createBuffer(mod, new Uint8Array(buffer));
  }

  const ptr = mod._malloc(buffer.length);
  mod.writeArrayToMemory(buffer, ptr);
  const free = () => mod._free(ptr);
  return [ptr, buffer.length, free];
}

export function withBuffer<T>(
  mod: LibParakeet,
  buffer: ArrayBuffer | ArrayLike<number>,
  callback: (ptr: WASM_ptr, len: number) => T
): T {
  let isPromise = false;
  const [ptr, len, free] = createBuffer(mod, buffer);

  try {
    const result = callback(ptr, len);
    if (result instanceof Promise) {
      isPromise = true;
      result.finally(free);
    }
    return result;
  } finally {
    if (!isPromise) {
      free();
    }
  }
}
