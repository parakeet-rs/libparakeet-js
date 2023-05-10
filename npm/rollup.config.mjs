import { wasm } from '@rollup/plugin-wasm';
import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      format: 'esm',
    },
    plugins: [wasm(), typescript()],
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
