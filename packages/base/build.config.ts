import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig([
  {
    entries: ['src/index'],
    declaration: false,
    clean: true,
    rollup: {
      emitCJS: true
      // esbuild: {
      //   minify: true
      // }
    },
    failOnWarn: false
  },

  {
    entries: [
      {
        builder: 'mkdist',
        input: './src/',
        outDir: './es/',
        format: 'esm'
      }
    ],
    declaration: true,
    clean: true
  }
]);
