import { createViteConfig } from '@vtj/cli';
import { resolve } from 'path';
export default createViteConfig({
  debug: false,
  lib: true,
  elementPlus: false,
  cdn: !!process.env.CDN,
  libraryName: 'VtjUI',
  external: [
    'vue',
    'vue-router',
    'element-plus',
    '@element-plus/icons-vue',
    '@vueuse/core',
    '@vtj/utils',
    '@vtj/icons'
  ],
  externalGlobals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    'element-plus': 'ElementPlus',
    '@element-plus/icons-vue': 'ElementPlusIconsVue',
    '@vueuse/core': 'VueUse',
    '@vtj/utils': 'VtjUtils',
    '@vtj/icons': 'VtjIcons'
  }
});
