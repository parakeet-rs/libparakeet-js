import type { LibParakeet } from '../libparakeet';
import { readSizedBuffer, withBuffer } from '../utils/bufferHelper';

export class UtilsTcTea {
  constructor(public readonly mod: LibParakeet) {}

  decrypt(input: ArrayBuffer, key: string) {
    const ptr_result = withBuffer(this.mod, input, (ptr_input, len_input) => {
      return this.mod.tc_tea_decrypt(ptr_input, len_input, key);
    });
    return readSizedBuffer(this.mod, ptr_result);
  }

  encrypt(input: ArrayBuffer, key: string) {
    const ptr_result = withBuffer(this.mod, input, (ptr_input, len_input) => {
      return this.mod.tc_tea_encrypt(ptr_input, len_input, key);
    });
    return readSizedBuffer(this.mod, ptr_result);
  }
}
