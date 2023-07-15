import { createViteConfig } from '@vtj/cli';
export default createViteConfig({
  debug: false,
  lib: true,
  elementPlus: false,
  cdn: !!process.env.CDN,
  libraryName: 'VtjIcons',
  external: ['vue', '@element-plus/icons-vue'],
  externalGlobals: {
    vue: 'Vue',
    '@element-plus/icons-vue': 'ElementPlusIconsVue'
  }
});
