import { createViteConfig } from '@vtj/cli';
import { createDevPlugin } from '@vtj/dev';
import proxy from './proxy.config';
import * as envConfig from './env.config';

import { resolve, join } from 'path';
const ENV_TYPE = process.env.ENV_TYPE || 'local';
const packagesPath = resolve('../../packages');
const alias =
  ENV_TYPE === 'local'
    ? {
        '@vtj/utils': join(packagesPath, 'utils/src/index.ts'),
        '@vtj/ui/dist/style.css': join(packagesPath, 'ui/src/style/index.scss'),
        '@vtj/icons/dist/style.css': join(packagesPath, 'icons/src/style.scss'),
        '@vtj/designer/dist/style.css': join(
          packagesPath,
          'designer/src/style/index.scss'
        ),
        '@vtj/ui': join(packagesPath, 'ui/src'),
        '@vtj/core': join(packagesPath, 'core/src'),
        '@vtj/designer': join(packagesPath, 'designer/src'),
        '@vtj/renderer': join(packagesPath, 'renderer/src')
      }
    : undefined;

export default createViteConfig({
  visualizer: false,
  proxy,
  envConfig,
  envType: process.env.ENV_TYPE || 'local',
  plugins: [createDevPlugin()],
  alias
});
