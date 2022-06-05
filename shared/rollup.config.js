import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const extensions = ['.ts', '.js'];

export default {
  input: ['./src/index.ts'],
  output: {
    dir: 'build',
    format: 'esm'
  },
  treeshake: false,
  plugins: [
    babel({ extensions, babelHelpers: 'runtime' }),
    commonjs({ extensions }),
    nodeResolve({ extensions })
  ]
};
