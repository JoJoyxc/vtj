import { createViteConfig } from '@vtj/cli';
import { createDevTools } from '@vtj/pro/vite';
import proxy from './proxy.config';
const basePath = '/lowcode/';
export default createViteConfig({
  base: basePath,
  proxy,
  elementPlus: false,
  plugins: [
    createDevTools({
      staticBase: basePath,
      devMode: true,
      pluginNodeModulesDir: '../../node_modules'
    })
  ]
});
