import test from 'ava';
import { fetchParakeet, LibParakeetInit } from '../../index';

function createDummyData(len: number) {
  const data = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    data[i] = i & 0xff;
  }
  return data;
}

test('quick sanity test', async (t) => {
  const data = createDummyData(0x2000);
  const parakeet = await fetchParakeet(await LibParakeetInit());
  const sourceReader = parakeet.make.Reader(data);
  const sinkWriter = parakeet.make.WriterSink();
  const writer = sinkWriter.getWriter();

  try {
    parakeet.mod.rw_test(writer, sourceReader);
  } finally {
    writer.delete();
    sourceReader.delete();
  }

  const result = new Uint8Array(await sinkWriter.collectBlob().arrayBuffer());
  t.deepEqual(result, data, 'generated data should be equal');
});
