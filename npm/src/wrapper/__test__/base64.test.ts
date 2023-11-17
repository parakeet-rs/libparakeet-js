/* eslint-disable @typescript-eslint/no-non-null-assertion */
import test from 'ava';
import { fetchParakeet, LibParakeetInit } from '../../index';

test('base64 str api', async (t) => {
  const parakeet = await fetchParakeet(await LibParakeetInit());
  t.is(parakeet.Base64.encodeFromString('hello world'), 'aGVsbG8gd29ybGQ=');
  t.is(parakeet.Base64.decodeToString('aGVsbG8gd29ybGQ='), 'hello world');
});

test('base64 encode buffer', async (t) => {
  const parakeet = await fetchParakeet(await LibParakeetInit());
  t.is(parakeet.Base64.encode(new TextEncoder().encode('hello world')), 'aGVsbG8gd29ybGQ=');
});

test('base64 decode buffer', async (t) => {
  const parakeet = await fetchParakeet(await LibParakeetInit());

  t.deepEqual(parakeet.Base64.decode('aGVsbG8gd29ybGQ='), new TextEncoder().encode('hello world'));
});
