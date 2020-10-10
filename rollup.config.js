const path = require('path');
const typescript = require('@rollup/plugin-typescript');
const json = require('@rollup/plugin-json');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');

const plugins = [
  typescript({ sourceMap: process.env.NODE_ENV === 'development' }),
  json(),
  commonjs(),
  nodeResolve()
];

const external = [
  'babel-plugin-macros',
  'styled-components',
  'react',
  'react-dom'
];

module.exports = [
  {
    input: 'src/macro/macro.ts',
    output: {
      dir: path.join(__dirname, 'dist', 'macro'),
      format: 'cjs',
      compact: process.env.NODE_ENV !== 'development',
      exports: 'auto'
    },
    plugins,
    external
  },
  {
    input: 'src/index.tsx',
    output: {
      dir: path.join(__dirname, 'dist'),
      format: 'cjs',
      compact: process.env.NODE_ENV !== 'development',
      exports: 'auto'
    },
    plugins,
    external
  }
];
