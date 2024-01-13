import { createViteConfig } from '@vtj/cli';
import { createDevPlugin } from '@vtj/pro/vite';
import proxy from './proxy.config';

export default createViteConfig({
  visualizer: false,
  proxy,
  plugins: [
    createDevPlugin({
      devMode: true
    })
  ]
});
