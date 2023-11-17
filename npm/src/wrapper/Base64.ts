import type { LibParakeet } from '../libparakeet';
import { readSizedBuffer, withBuffer } from '../utils/bufferHelper';

export class UtilsBase64 {
  constructor(public readonly mod: LibParakeet) {}

  decode(input: string) {
    const input_buffer = new TextEncoder().encode(input);

    const ptr_result = withBuffer(this.mod, input_buffer, (ptr_input, len_input) => {
      return this.mod.base64_decode(ptr_input, len_input);
    });

    return readSizedBuffer(this.mod, ptr_result);
  }

  encode(input: ArrayBuffer): string {
    const ptr_result = withBuffer(this.mod, input, (ptr_input, len_input) => {
      return this.mod.base64_encode(ptr_input, len_input);
    });
    const result = readSizedBuffer(this.mod, ptr_result);
    return result ? new TextDecoder().decode(result) : '';
  }

  encodeFromString(input: string): string {
    return this.mod.base64_encode_str(input);
  }
  decodeToString(input: string): string {
    return this.mod.base64_decode_str(input);
  }
}
