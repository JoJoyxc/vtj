import { createViteConfig } from '@vtj/cli';
export default createViteConfig({
  debug: false,
  lib: true,
  cdn: !!process.env.CDN,
  libraryName: '{{libraryName}}',
  external: ['vue'],
  externalGlobals: {
    vue: 'Vue'
  }
});
