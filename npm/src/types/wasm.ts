export type WASM_ptr = number;
export type WASM_NUMBER = 'i8' | 'i16' | 'i32' | 'i64' | 'float' | 'double';
export type PARAKEET_CRYPTO_HANDLE = number; // u16 integer

export declare interface WASMExportedRuntime {
  /**
   * Emscripten HEAP, use this for raw memory access.
   * @type {Uint8Array}
   */
  HEAPU8: Uint8Array;

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
  writeArrayToMemory(data: Uint8Array, bufferPointer: WASM_ptr): void;

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
}
