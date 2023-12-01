import { createViteConfig } from '@vtj/cli';

const BUILD_TYPE = process.env.BUILD_TYPE || '';

const dirs = {
  ui: {
    entry: 'src/vtj-ui-entry.ts',
    library: 'VtjUIAssets',
    output: 'vtj-ui-assets.js'
  },
  el: {
    entry: 'src/element-plus-entry.ts',
    library: 'ElementPlusAssets',
    output: 'element-plus-assets.js'
  },
  antd: {
    entry: 'src/ant-design-vue-entry.ts',
    library: 'AntDesignVueAssets',
    output: 'ant-design-vue-assets.js'
  }
};

function createConfig(type: string) {
  const { entry, libName, output } = dirs[type];
  return createViteConfig({
    debug: false,
    elementPlus: false,
    lib: true,
    dts: false,
    babel: true,
    entry: entry,
    fileName: (format) => output,
    formats: ['umd'],
    libraryName: libName,
    libTarget: 'es2015',
    external: ['vue', '@vtj/engine'],
    externalGlobals: {
      vue: 'Vue'
    },
    defineConfig(config) {
      config.build.emptyOutDir = false;
      return config;
    }
  });
}

export default createConfig(BUILD_TYPE);
