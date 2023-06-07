import test from 'ava';
import { fetchParakeet, LibParakeetInit } from '../../index';

test('KeyCrypto sanity test', async (t) => {
  const parakeet = await fetchParakeet(await LibParakeetInit());
  const keyCrypto = parakeet.make.QMCv2KeyCrypto(123, '1111222233334444', '5555666677778888');
  const encrypted = keyCrypto.encrypt(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]));
  if (encrypted === null) {
    throw new Error('encrypted should not be null');
  }
  const decrypted = keyCrypto.decrypt(encrypted);
  t.deepEqual(decrypted, new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]));
});
