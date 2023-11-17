export type WASM_ptr = number;
export type size_t = number;
export type WASM_NUMBER = 'i8' | 'i16' | 'i32' | 'i64' | 'float' | 'double';
export type PARAKEET_CRYPTO_HANDLE = number; // u16 integer

export declare interface WASMExportedRuntime {
  /**
   * Emscripten HEAP, use this for raw memory access.
   * @type {Uint8Array}
   */
  HEAPU8: Uint8Array;
  HEAPU16: Uint16Array;
  HEAPU32: Uint32Array;
  HEAPF32: Float32Array;
  HEAPF64: Float64Array;
  HEAP8: Int8Array;
  HEAP16: Int16Array;
  HEAP32: Int32Array;

  /**
   * Allocate a block of {@link size} bytes of memory in Emscripten HEAP
   * @param size Size of the memory block, in bytes.
   * @returns {WASM_ptr} Returns a pointer to the beginning of the block.
   */
  _malloc(size: number): WASM_ptr;

  /**
   * Free an allocated block of memory.
   * @param ptr Pointer to a memory block previously allocated with `malloc`.
   */
  _free(ptr: WASM_ptr): void;

  /**
   * Write an uint8 array to the Emscripten HEAP.
   * @param data Data to be written inside the Emscripten HEAP.
   * @param bufferPointer Address pointer
   */
  writeArrayToMemory(data: ArrayLike<number>, bufferPointer: WASM_ptr): void;

  /**
   * Gets a value at a specific memory address at run-time.
   * NOTE: it only does aligned write and read.
   * @param ptr A pointer (number) representing the memory address.
   * @param type An LLVM IR type as a string.
   * @returns value at a specific address.
   */
  getValue(ptr: WASM_ptr, type: WASM_NUMBER): number;

  /**
   * Given a pointer `ptr` to a null-terminated UTF8-encoded string in the
   * Emscripten HEAP, returns a copy of that string as a JavaScript `String`
   * object.
   * @param ptr A pointer to a null-terminated UTF8-encoded string in the
   *            Emscripten HEAP.
   * @param maxBytesToRead An optional length that specifies the maximum
   *                       number of bytes to read.
   *                       Omit to read until the null-terminator.
   */
  UTF8ToString(ptr: WASM_ptr, maxBytesToRead?: number): string;

  /**
   * Copies the given JavaScript `String` object `str` to the Emscripten HEAP at address outPtr,
   *   null-terminated and encoded in UTF8 form.
   * The copy will require at most `str.length*4+1` bytes of space in the HEAP.
   *   You can use the function `lengthBytesUTF8()` to compute the exact amount of bytes (excluding the null terminator)
   *   needed to encode the string.
   *
   * @param str A JavaScript `String` object.
   * @param outPtr Pointer to data copied from str, encoded in UTF8 format and null-terminated.
   * @param maxBytesToWrite A limit on the number of bytes that this function can at most write out.
   *                        If the string is longer than this, the output is truncated.
   *                        The outputted string will always be null terminated, even if truncation occurred,
   *                        as long as `maxBytesToWrite > 0`.
   */
  stringToUTF8(str: string, outPtr: WASM_ptr, maxBytesToWrite: number): void;

  /**
   * Compute the exact amount of bytes (excluding the null terminator) needed to encode the string.
   * @param str
   */
  lengthBytesUTF8(str: string): number;
}
