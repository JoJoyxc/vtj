import { createViteConfig } from '@vtj/cli';

export default createViteConfig({
  lib: true,
  dts: true,
  version: true,
  external: [
    'vue',
    'vue-router',
    'element-plus',
    '@element-plus/icons-vue',
    '@vueuse/core',
    '@vtj/core',
    '@vtj/utils',
    '@vtj/icons',
    '@vtj/ui',
    'element-plus/es/locale/lang/zh-cn'
  ],
  formats: ['es', 'cjs']
});
