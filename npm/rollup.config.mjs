/* eslint-env node */
import { dts } from 'rollup-plugin-dts';

import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy-assets';
import replace from '@rollup/plugin-replace';

import cp from 'node:child_process';
import * as url from 'node:url';
import * as path from 'node:path';
import { readFileSync } from 'node:fs';

const gitRoot = url.fileURLToPath(new URL('..', import.meta.url));
const pathToLibParakeetWasm = url.fileURLToPath(new URL('src/libparakeet.wasm', import.meta.url));
const libParakeetWasm = readFileSync(pathToLibParakeetWasm).toString('hex');

function command(cmd, dir = '') {
  return cp.execSync(cmd, { cwd: path.join(gitRoot, dir), encoding: 'utf-8' }).trim();
}

const COMMAND_GIT_VERSION = 'git describe --long --dirty --tags --always';
const shortCommit = command(COMMAND_GIT_VERSION);
const libParakeetCryptoVer = command(COMMAND_GIT_VERSION, 'vendor/libparakeet');
const libParakeetAudioVer = command(COMMAND_GIT_VERSION, 'vendor/libparakeet-audio');

function replacePlugin() {
  return replace({
    preventAssignment: true,
    values: {
      __BUILD_SDK_VERSION__: shortCommit,
      __BUILD_LIB_PARAKEET_CRYPTO__: libParakeetCryptoVer,
      __BUILD_LIB_PARAKEET_AUDIO__: libParakeetAudioVer,
      __LIBPARAKEET_WASM_FILE_HEX__: libParakeetWasm,
    },
  });
}

export default [
  ...['index', 'inline'].flatMap((file) => {
    return [
      { ext: 'mjs', format: 'esm' },
      { ext: 'js', format: 'cjs' },
      { ext: 'd.ts', format: 'es', makeDts: true, assets: true },
    ].map(({ ext, format, makeDts, assets }) => ({
      input: `src/${file}.ts`,
      output: {
        file: `dist/${file}.${ext}`,
        format,
      },
      external: ['module', './index'],
      plugins: makeDts
        ? [dts(), assets && copy({ assets: ['src/libparakeet.wasm'] })]
        : [
            replacePlugin(),
            typescript({
              tsconfigOverride: {
                compilerOptions: { module: 'ES2020', declaration: false },
              },
            }),
          ],
    }));
  }),
].filter((item) => {
  if (!process.env.FILTER_BY_OUTPUT) {
    return true;
  }

  return item.output.file.includes(process.env.FILTER_BY_OUTPUT);
});
