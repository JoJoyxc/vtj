import { createViteConfig } from '@vtj/cli';

const isUmd = !!process.env.UMD;

export default createViteConfig({
  lib: true,
  dts: isUmd ? false : true,
  version: true,
  library: 'VtjIcons',
  emptyOutDir: isUmd ? false : true,
  external: ['vue'],
  externalGlobals: isUmd
    ? {
        vue: 'Vue'
      }
    : undefined,
  formats: isUmd ? ['umd', 'iife'] : ['es', 'cjs']
});
