import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig([
  {
    entries: [
      'src/index',
      {
        builder: 'mkdist',
        input: 'src',
        outDir: 'es',
        format: 'esm',
        declaration: true
      }
    ],
    declaration: false,
    clean: true,
    failOnWarn: false,
    rollup: {
      emitCJS: true
      // esbuild: {
      //   minify: true
      // }
    }
  }
]);
