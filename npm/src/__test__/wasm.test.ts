import test from 'ava';
import { fetchParakeet } from '..';

test('accessible to Emscripten memory allocation methods', async (t) => {
  const { mod } = await fetchParakeet();
  t.plan(2);
  t.is(typeof mod._malloc, 'function');
  t.is(typeof mod._free, 'function');
});

test('accessible to Emscripten runtime methods', async (t) => {
  const { mod } = await fetchParakeet();
  t.is(typeof mod.writeArrayToMemory, 'function');
  t.is(typeof mod.getValue, 'function');
  t.is(typeof mod.UTF8ToString, 'function');
  t.is(typeof mod.stringToUTF8, 'function');
  t.is(typeof mod.lengthBytesUTF8, 'function');
});

test('accessible to Emscripten heaps', async (t) => {
  const { mod } = await fetchParakeet();
  t.assert(mod.HEAPU8 instanceof Uint8Array);
  t.assert(mod.HEAPU16 instanceof Uint16Array);
  t.assert(mod.HEAPU32 instanceof Uint32Array);
  t.assert(mod.HEAPF32 instanceof Float32Array);
  t.assert(mod.HEAPF64 instanceof Float64Array);
  t.assert(mod.HEAP8 instanceof Int8Array);
  t.assert(mod.HEAP16 instanceof Int16Array);
  t.assert(mod.HEAP32 instanceof Int32Array);
});
