import { wasm } from '@rollup/plugin-wasm';
import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy-assets';

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      format: 'esm',
    },
    plugins: [wasm(), typescript(), copy({ assets: ['src/libparakeet-wasm.d.ts'] })],
  },
  {
    input: 'src/test.ts',
    output: {
      dir: 'dist',
      format: 'esm',
    },
    plugins: [wasm(), typescript()],
  },
];
