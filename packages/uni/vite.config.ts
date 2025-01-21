import { createViteConfig } from '@vtj/cli';
const BUILD_TYPE = process.env.BUILD_TYPE || '';
export default createViteConfig(
  BUILD_TYPE === 'feat'
    ? {
        lib: true,
        dts: true,
        entry: 'src/features.ts',
        libFileName: 'features',
        version: false,
        formats: ['es'],
        emptyOutDir: false,
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
        ]
      }
    : {
        lib: true,
        dts: true,
        version: true,
        formats: ['es'],
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
      }
);
