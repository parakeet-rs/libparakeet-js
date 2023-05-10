import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy-assets';

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      format: 'esm',
    },
    external: ['module'],
    plugins: [typescript(), copy({ assets: ['src/libparakeet-wasm.d.ts', 'src/libparakeet-wasm.wasm'] })],
  },
  {
    input: 'src/test.ts',
    output: {
      dir: 'dist',
      format: 'esm',
    },
    external: ['module'],
    plugins: [typescript()],
  },
];
