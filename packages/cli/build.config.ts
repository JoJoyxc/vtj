import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index'],
  externals: [
    'vite',
    '@babel/core',
    'terser',
    'fs-extra',
    '@vitejs/plugin-vue',
    '@vitejs/plugin-vue-jsx',
    '@vitejs/plugin-legacy',
    '@vitejs/plugin-basic-ssl',
    'rollup-plugin-visualizer',
    'rollup-plugin-external-globals',
    'unplugin-element-plus',
    'unplugin-vue-components',
    'unplugin-element-plus',
    'vite-plugin-dts',
    'unplugin-vue-define-options',
    'esbuild',
    '@vue/compiler-sfc',
    '@babel/parser',
    'body-parser',
    'serve-static'
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true
  },
  outDir: 'lib',
  stub: false
});
