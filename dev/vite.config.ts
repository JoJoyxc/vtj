import { createViteConfig } from '@vtj/cli';
import { resolve, join } from 'path';
import * as EnvConfig from './env.config';
import proxy from './proxy.config';
const ENV_TYPE = process.env.ENV_TYPE || 'local';
const packagesPath = resolve('../packages');

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
        '@vtj/designer': join(packagesPath, 'designer/src')
      }
    : undefined;

export default createViteConfig({
  host: '0.0.0.0',
  https: false,
  legacy: false,
  proxy,
  envConfig: EnvConfig,
  envType: ENV_TYPE,
  alias,
  elementPlus: true,
  babel: false,
  staticDirs: ['../packages'],
  pages: {
    main: 'index.html',
    ide: 'ide.html'
  }
});
