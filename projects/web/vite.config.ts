import { createViteConfig } from '@vtj/cli';
import proxy from './proxy.config';
import * as envConfig from './env.config';

export default createViteConfig({
  visualizer: false,
  proxy,
  envConfig,
  envType: process.env.ENV_TYPE || 'local'
});
