import type { LibParakeet, PARAKEET_CRYPTO_HANDLE } from '../index';
import { readSizedBuffer, withBuffer } from '../utils/bufferHelper';

export enum FooterParserState {
  OK = 0,
  NeedMoreBytes = 1,
  KeyDecryptionFailure = 2,
  UnsupportedAndroidClientSTag = 3,
  IOReadFailure = 4,
  MusicExBufferOverflow = 5,
  UnknownContent = 9,

  // added by wrapper lib
  ResultHandleInvalid = 0xff,
}

export interface FooterParserResult {
  state: FooterParserState;
  mediaName: string;
  footerSize: number;
  ekey: Uint8Array | null;
}

export class QMCv2FooterParser {
  private _handle: PARAKEET_CRYPTO_HANDLE;
  constructor(
    private mod: LibParakeet,
    seed: number,
    enc_v2_key_1: string,
    enc_v2_key_2: string,
  ) {
    this._handle = mod.qmcv2_footer_parser_new(seed, enc_v2_key_1, enc_v2_key_2);
  }

  get handle() {
    return this._handle;
  }

  parse(buffer: ArrayBuffer): FooterParserResult {
    const resultHandle = withBuffer(this.mod, buffer, (ptr, len) =>
      this.mod.qmcv2_footer_parse(this._handle, ptr, len),
    );

    try {
      return {
        ekey: readSizedBuffer(this.mod, this.mod.qmcv2_footer_result_get_ekey(resultHandle)),
        footerSize: this.mod.qmcv2_footer_result_get_footer_size(resultHandle),
        mediaName: this.mod.qmcv2_footer_result_get_media_name(resultHandle),
        state: this.mod.qmcv2_footer_result_get_state(resultHandle),
      };
    } finally {
      this.mod.qmcv2_footer_result_delete(resultHandle);
    }
  }

  delete() {
    this.mod.qmcv2_footer_parser_delete(this._handle);
  }
}
