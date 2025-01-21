import { createViteConfig } from '@vtj/cli';
export default createViteConfig({
  lib: true,
  dts: true,
  version: true,
  formats: ['es', 'cjs'],
  external: [
    'vue',
    'vue-router',
    '@vtj/base',
    '@vtj/core',
    '@vtj/ui',
    '@vtj/utils',
    '@vtj/icons',
    '@dcloudio/uni-app',
    '@dcloudio/uni-h5'
  ],
  styleBundler: true
});
