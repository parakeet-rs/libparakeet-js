import test from 'ava';
import { fetchParakeet, LibParakeetInit } from '../..';

test('detect flac magic as flac', async (t) => {
  const parakeet = await fetchParakeet(await LibParakeetInit());
  const result = parakeet.detectAudioExtension('fLaC padding'.split('').map((x) => x.charCodeAt(0)));
  t.is(result, 'flac', 'should report flac');
});
