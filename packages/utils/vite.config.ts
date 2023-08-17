import { createViteConfig, writeVersion } from '@vtj/cli';
writeVersion();
const fileMap = {
  es: 'index.mjs',
  cjs: 'index.cjs'
};
export default createViteConfig({
  debug: false,
  lib: true,
  libraryName: 'VtjUtils',
  formats: !!process.env.CDN ? undefined : ['es', 'cjs'],
  fileName: !!process.env.CDN ? undefined : (format) => fileMap[format],
  elementPlus: false,
  cdn: !!process.env.CDN,
  external: ['vue', '@vueuse/core'],
  externalGlobals: {
    vue: 'Vue',
    '@vueuse/core': 'VueUse'
  }
});
