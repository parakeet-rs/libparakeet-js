import type { LibParakeet } from '../libparakeet';
import { SeekDirection } from '../types/ParakeetInterface';

export function createArrayBufferReader(data: ArrayBuffer, mod: LibParakeet) {
  let realPos = 0;

  return mod.IReadSeekable.implement({
    Seek(position, seek_dir) {
      switch (seek_dir) {
        case SeekDirection.SEEK_CURRENT_POSITION:
          realPos += position;
          break;
        case SeekDirection.SEEK_FILE_BEGIN:
          realPos = position;
          break;
        case SeekDirection.SEEK_FILE_END:
          realPos = data.byteLength + position;
          break;
      }
    },
    GetOffset() {
      return realPos;
    },
    GetSize() {
      return data.byteLength;
    },
    Read(buffer, len) {
      const view = new Uint8Array(data.slice(realPos, realPos + len));
      mod.writeArrayToMemory(view, buffer);
      realPos += view.byteLength;
      return view.byteLength;
    },
  });
}

export class BlobSink {
  private data: Uint8Array[] = [];
  constructor(private mod: LibParakeet) {}

  getWriter = () =>
    this.mod.IWriteable.implement({
      Write: (buffer, len) => {
        this.data.push(new Uint8Array(this.mod.HEAPU8.slice(buffer, buffer + len)));
      },
    });

  collect = () => {
    const result = this.data;
    this.data = [];
    return result;
  };

  collectBlob = () => {
    return new Blob(this.collect());
  };
}
