import type { IReadSeekableImpl, IWriteableImpl, LibParakeet, PARAKEET_CRYPTO_HANDLE, TransformResult } from '../index';

export class Transformer {
  constructor(
    private mod: LibParakeet,
    private handle: PARAKEET_CRYPTO_HANDLE,
  ) {
    if (!handle) {
      throw new Error(`could not create transformer: handle is null`);
    }
  }

  get Name() {
    return this.mod.transformer_get_name(this.handle);
  }

  Transform(dst: IWriteableImpl, src: IReadSeekableImpl): TransformResult {
    return this.mod.transformer_transform(this.handle, dst, src);
  }

  delete() {
    this.mod.transformer_delete(this.handle);
  }
}
