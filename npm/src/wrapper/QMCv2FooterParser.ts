import type { IReadSeekableImpl, LibParakeet, PARAKEET_CRYPTO_HANDLE } from '../index';

export class QMCv2FooterParser {
  private _handle: PARAKEET_CRYPTO_HANDLE;
  constructor(private mod: LibParakeet, seed: number, enc_v2_key_1: string, enc_v2_key_2: string) {
    this._handle = mod.qmcv2_footer_parser_new(seed, enc_v2_key_1, enc_v2_key_2);
  }

  get handle() {
    return this._handle;
  }

  delete() {
    this.mod.qmcv2_footer_parser_delete(this._handle);
  }
}
