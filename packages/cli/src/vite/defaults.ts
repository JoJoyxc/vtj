import { CreateViteConfigOptions } from './types';

export const defaults: CreateViteConfigOptions = {
  debug: false,
  base: '/',
  port: 9527,
  previewPort: 3010,
  envType: 'local',
  dtsOutputDir: 'types',
  targets: ['chrome > 60'],
  polyfills: true,
  entry: 'src/index.ts',
  libFileName: 'index',
  formats: ['es', 'cjs', 'umd', 'iife']
};