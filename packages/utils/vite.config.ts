import { createViteConfig } from '@vtj/cli';
export default createViteConfig({
  debug: false,
  lib: true,
  libraryName: 'VtjUtils',
  elementPlus: false,
  cdn: !!process.env.CDN,
  external: ['vue', '@vueuse/core'],
  externalGlobals: {
    vue: 'Vue',
    '@vueuse/core': 'VueUse'
  }
});
