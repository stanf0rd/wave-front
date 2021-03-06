import copy from 'rollup-plugin-copy';
import preprocess from 'svelte-preprocess';
import livereload from 'rollup-plugin-livereload';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import rootImport from 'rollup-plugin-root-import';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';


export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    rootImport({
      root: [
        `${__dirname}/src`,
        `${__dirname}/src/core/Wave`,
      ],
      useEntry: 'prepend',
      extensions: ['.js', '.svelte'],
    }),
    svelte({
      include: 'src/**/*.svelte',
      preprocess: preprocess({
        postcss: true,
      }),
      css: css => css.write('dist/style.css'),
    }),
    resolve({ extensions: ['.mjs', '.js'] }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.BUILD),
    }),
    copy({
      targets: [
        { src: 'static', dest: 'dist' },
        { src: 'src/index.html', dest: 'dist' },
      ],
    }),
    process.env.BUILD === 'production'
      ? terser()
      : livereload({ watch: 'dist' }),
  ],
};
