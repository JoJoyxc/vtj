import { createViteConfig } from '@vtj/cli';
export default createViteConfig({
  lib: true,
  dts: true,
  version: true,
  formats: ['es', 'cjs'],
  external: ['vue', 'mitt', 'zen-logger']
});