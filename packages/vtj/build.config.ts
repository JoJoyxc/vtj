import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index'],
  externals: ['vite'],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true
  },
  outDir: 'lib',
  stub: false,
  alias: {
    // we can always use non-transpiled code since we support 14.18.0+
    prompts: 'prompts/lib/index.js'
  }
});
