/* eslint-env node */

import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy-assets';
import replace from '@rollup/plugin-replace';

import cp from 'node:child_process';
import * as url from 'node:url';
import * as path from 'node:path';

const gitRoot = url.fileURLToPath(new URL('..', import.meta.url));

function system(cmd, dir = '') {
  return cp.execSync(cmd, { cwd: path.join(gitRoot, dir), encoding: 'utf-8' }).trim();
}

const shortCommit = system('git describe --long --dirty --tags --always');
const libParakeetVer = system('git describe --long --dirty --tags --always', 'vendor/libparakeet');

function commonPlugins() {
  return [
    replace({
      preventAssignment: true,
      values: {
        __BUILD_SDK_VERSION__: shortCommit,
        __BUILD_LIB_PARAKEET__: libParakeetVer,
      },
    }),
  ];
}

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.mjs',
      format: 'esm',
    },
    external: ['module'],
    plugins: [...commonPlugins(), typescript(), copy({ assets: ['src/libparakeet.d.ts', 'src/libparakeet.wasm'] })],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
    },
    external: ['module'],
    plugins: [...commonPlugins(), typescript({ tsconfigOverride: { declaration: false } })],
  },
  {
    input: 'src/test.ts',
    output: {
      dir: 'dist',
      format: 'esm',
    },
    external: ['module'],
    plugins: [...commonPlugins(), typescript({ tsconfigOverride: { declaration: false } })],
  },
];
