/* eslint-disable @typescript-eslint/no-non-null-assertion */
import test from 'ava';
import { fetchParakeet, LibParakeetInit } from '../../index';

test('tc-tea sanity check', async (t) => {
  const parakeet = await fetchParakeet(await LibParakeetInit());
  const key = '0123456789ABCDEF';
  const encrypted_data = new Uint8Array([
    0x47, 0x36, 0xb5, 0x63, 0x3f, 0x85, 0xa9, 0x75, 0xbd, 0xc3, 0x8c, 0xd7, 0xc5, 0x81, 0x6e, 0x4d,
  ]);

  const textDecoder = new TextDecoder();
  const decrypted = parakeet.TcTea.decrypt(encrypted_data, key)!;
  t.truthy(decrypted);
  t.is(textDecoder.decode(decrypted), 'hello');

  const encrypted = parakeet.TcTea.encrypt(decrypted, key)!;
  t.truthy(decrypted);
  const decryptedSecondTime = parakeet.TcTea.decrypt(encrypted, key)!;
  t.truthy(decryptedSecondTime);
  t.is(textDecoder.decode(decryptedSecondTime), 'hello');
});
