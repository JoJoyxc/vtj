import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig([
  {
    entries: [
      {
        input: 'src/lcdp',
        builder: 'mkdist'
      }
    ],
    outDir: 'lib',
    declaration: false,
    clean: true,
    failOnWarn: false,
    rollup: {
      emitCJS: false
    },
    externals: [
      'element-plus/theme-chalk/dark/css-vars.css',
      'element-plus/theme-chalk/index.css',
      '@vtj/ui/dist/style.css',
      '@vtj/icons/dist/style.css',
      '@vtj/designer/dist/style.css',
      '@vtj/core',
      '@vtj/designer',
      '@vtj/renderer'
    ]
  }
]);
