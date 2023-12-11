import type { Dependencie } from '@vtj/core';

export const builtInDeps: Dependencie[] = [
  {
    package: 'vue',
    version: 'latest',
    library: 'Vue',
    urls: ['./@vtj/deps/vue/vue.global.prod.js'],
    required: true,
    official: true,
    enabled: true
  },
  {
    package: 'vue-router',
    version: 'latest',
    library: 'VueRouter',
    urls: ['./@vtj/deps/vue-router/vue-router.global.prod.js'],
    required: true,
    official: true,
    enabled: true
  },
  {
    package: '@vtj/utils',
    version: 'latest',
    library: 'VtjUtils',
    urls: ['./@vtj/deps/@vtj/utils/index.umd.js'],
    required: true,
    official: true,
    enabled: true
  },
  {
    package: '@vtj/icons',
    version: 'latest',
    library: 'VtjIcons',
    urls: [
      './@vtj/deps/@vtj/icons/style.css',
      './@vtj/deps/@vtj/icons/index.umd.js'
    ],
    required: true,
    official: true,
    enabled: true
  },
  {
    package: 'element-plus',
    version: 'latest',
    library: 'ElementPlus',
    urls: [
      './@vtj/deps/element-plus/index.css',
      './@vtj/deps/element-plus/index.full.min.js'
    ],
    assetsUrl: './@vtj/materials/element/index.umd.js',
    assetsLibrary: 'ElementPlusMaterial',
    required: false,
    official: true,
    enabled: true
  },
  {
    package: 'echarts',
    version: 'latest',
    library: 'echarts',
    urls: ['./@vtj/deps/echarts/echarts.min.js'],
    required: false,
    official: true,
    enabled: true
  },
  {
    package: '@vtj/ui',
    version: 'latest',
    library: 'VtjUI',
    urls: ['./@vtj/deps/@vtj/ui/style.css', './@vtj/deps/@vtj/ui/index.umd.js'],
    assetsUrl: './@vtj/materials/ui/index.umd.js',
    assetsLibrary: 'VtjUIMaterial',
    required: false,
    official: true,
    enabled: true
  }
];
