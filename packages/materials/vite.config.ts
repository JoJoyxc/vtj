import { createViteConfig } from '@vtj/cli';

const BUILD_TYPE = process.env.BUILD_TYPE || '';

const materials = {
  ui: {
    entry: 'src/ui/index.ts',
    library: 'VtjUIMaterial',
    outDir: 'dist/assets/ui'
  },
  element: {
    entry: 'src/element/index.ts',
    library: 'ElementPlusMaterial',
    outDir: 'dist/assets/element'
  },
  antdv: {
    entry: 'src/antdv/index.ts',
    library: 'AntdvMaterial',
    outDir: 'dist/assets/antdv'
  },
  charts: {
    entry: 'src/charts/index.ts',
    library: 'VtjChartsMaterial',
    outDir: 'dist/assets/charts'
  },
  vant: {
    entry: 'src/vant/index.ts',
    library: 'VantMaterial',
    outDir: 'dist/assets/vant'
  },
  uniApp: {
    entry: 'src/uni-app/index.ts',
    library: 'UniApp',
    outDir: 'dist/deps/uni-app'
  },
  uniH5: {
    entry: 'src/uni-h5/index.ts',
    library: 'UniH5',
    outDir: 'dist/deps/uni-h5'
  },
  uniH5C: {
    entry: 'src/uni-h5/components/index.ts',
    library: 'UniH5Material',
    outDir: 'dist/assets/uni-h5'
  }
};

function createConfig(name: string) {
  const { entry, library, outDir } = materials[name];
  return createViteConfig({
    library,
    entry,
    outDir,
    lib: true,
    dts: false,
    version: true,
    formats: ['umd'],
    buildTarget: 'es2015',
    external: ['vue', 'vue-router', '@vtj/base', '@vtj/core'],
    externalGlobals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      '@vtj/base': 'VtjBase',
      '@vtj/core': 'VtjCore'
    }
  });
}

export default createConfig(BUILD_TYPE);
