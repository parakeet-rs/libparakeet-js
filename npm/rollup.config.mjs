/* eslint-env node */

import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy-assets';
import replace from '@rollup/plugin-replace';

import cp from 'node:child_process';
import * as url from 'node:url';
import * as path from 'node:path';
const tsBuildOptions = {
  module: 'ES2020',
};

const gitRoot = url.fileURLToPath(new URL('..', import.meta.url));

function command(cmd, dir = '') {
  return cp.execSync(cmd, { cwd: path.join(gitRoot, dir), encoding: 'utf-8' }).trim();
}

const COMMAND_GIT_VERSION = 'git describe --long --dirty --tags --always';
const shortCommit = command(COMMAND_GIT_VERSION);
const libParakeetCryptoVer = command(COMMAND_GIT_VERSION, 'vendor/libparakeet');
const libParakeetAudioVer = command(COMMAND_GIT_VERSION, 'vendor/libparakeet-audio');

function commonPlugins() {
  return [
    replace({
      preventAssignment: true,
      values: {
        __BUILD_SDK_VERSION__: shortCommit,
        __BUILD_LIB_PARAKEET_CRYPTO__: libParakeetCryptoVer,
        __BUILD_LIB_PARAKEET_AUDIO__: libParakeetAudioVer,
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
    plugins: [
      ...commonPlugins(),
      typescript({ tsconfigOverride: { ...tsBuildOptions, declaration: true } }),
      copy({ assets: ['src/libparakeet.d.ts', 'src/libparakeet.wasm'] }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
    },
    external: ['module'],
    plugins: [...commonPlugins(), typescript({ tsconfigOverride: tsBuildOptions })],
  },
  {
    input: 'src/test.ts',
    output: {
      dir: 'dist',
      format: 'esm',
    },
    external: ['module'],
    plugins: [...commonPlugins(), typescript({ tsconfigOverride: tsBuildOptions })],
  },
];
