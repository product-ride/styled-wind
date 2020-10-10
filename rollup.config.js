import path from 'path';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const plugins = [
  resolve(),
  commonjs({ exclude: ['node_modules/lodash-es/**'] }),
  json(),
  typescript({ sourceMap: process.env.NODE_ENV === 'development' }),
];

const external = [
  'babel-plugin-macros',
  'styled-components',
  'react',
  'react-dom'
];

export default [
  {
    input: 'src/macro/index.js',
    output: {
      file: path.join(__dirname, 'dist', 'macro.js'),
      format: 'cjs',
      compact: process.env.NODE_ENV !== 'development',
      exports: 'default'
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
      exports: 'default'
    },
    plugins,
    external
  }
];
