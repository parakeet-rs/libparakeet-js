import { loadLibParakeet, LibParakeet, BlobSink, createArrayBufferReader } from './index';

function createDummyData(len: number) {
  const data = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    data[i] = i & 0xff;
  }
  return data;
}

async function test1(mod: LibParakeet) {
  const src = createArrayBufferReader(createDummyData(0x2000), mod);
  const sink = new BlobSink(mod);
  const sinkWriter = sink.getWriter();
  mod.rw_test(sinkWriter, src);
  sinkWriter.delete();
  src.delete();

  const collected = sink.collectBlob();
  const copied = await collected.arrayBuffer();
  const copiedView = new Uint8Array(copied);
  if (copied.byteLength !== 0x2000) {
    document.writeln(`size mismatch (expected=0x2000, actual=${copied.byteLength})`);
  }

  for (let i = 0; i < copied.byteLength; i++) {
    if (copiedView[i] !== (i & 0xff)) {
      document.writeln(`validate at pos ${i} failed`);
      throw new Error(`validate at pos ${i} failed`);
    }
  }
  document.writeln('wasm validate 1 ok!');
}

async function test2(mod: LibParakeet) {
  const src = createArrayBufferReader(createDummyData(0x2000), mod);
  const sink = new BlobSink(mod);
  const sinkWriter = sink.getWriter();
  const handleTransformer = mod.create_transparent_transformer();
  const result = mod.transformer_transform(handleTransformer, sinkWriter, src);
  sinkWriter.delete();
  src.delete();

  document.writeln(`completed: ${result}`);
  const collected = sink.collectBlob();
  const copied = await collected.arrayBuffer();
  const copiedView = new Uint8Array(copied);
  if (copied.byteLength !== 0x2000) {
    document.writeln(`size mismatch (expected=0x2000, actual=${copied.byteLength})`);
  }
  for (let i = 0; i < copied.byteLength; i++) {
    if (copiedView[i] !== (i & 0xff)) {
      document.writeln(`validate at pos ${i} failed`);
      throw new Error(`validate at pos ${i} failed`);
    }
  }
  document.writeln('wasm validate 2 ok!');
}

loadLibParakeet().then(async (mod) => {
  (window as any).libParakeet = mod;
  await test1(mod);
  await test2(mod);
});
