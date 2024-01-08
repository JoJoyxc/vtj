import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig([
  {
    entries: [
      'src/index.ts',
      {
        builder: 'mkdist',
        input: 'src/vite',
        outDir: 'lib/vite'
      }
    ],
    outDir: 'lib',
    declaration: true,
    clean: true,
    failOnWarn: false,
    rollup: {
      emitCJS: false
    },
    externals: [
      'path',
      'element-plus/theme-chalk/dark/css-vars.css',
      'element-plus/theme-chalk/index.css',
      '@vtj/ui/dist/style.css',
      '@vtj/icons/dist/style.css',
      '@vtj/designer/dist/style.css',
      '@vtj/cli',
      '@vtj/core',
      '@vtj/node',
      '@vtj/designer',
      '@vtj/renderer',
      'serve-static',
      'body-parser'
    ]
  }
]);
