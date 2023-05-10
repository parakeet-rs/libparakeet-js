import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy-assets';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.mjs',
      format: 'esm',
    },
    external: ['module'],
    plugins: [typescript(), copy({ assets: ['src/libparakeet.d.ts', 'src/libparakeet.wasm'] })],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
    },
    external: ['module'],
    plugins: [typescript({ tsconfigOverride: { declaration: false } })],
  },
  {
    input: 'src/test.ts',
    output: {
      dir: 'dist',
      format: 'esm',
    },
    external: ['module'],
    plugins: [typescript({ tsconfigOverride: { declaration: false } })],
  },
];
