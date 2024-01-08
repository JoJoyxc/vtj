import {
  type Plugin,
  type ResolvedConfig,
  type ViteDevServer,
  type PreviewServer
} from 'vite';
import {
  copyPlugin,
  staticPlugin,
  type CopyPluginOption,
  type StaticPluginOption
} from '@vtj/cli';
import { pathExistsSync } from '@vtj/node';
import bodyParser from 'body-parser';
import { router } from './controller';

export interface VtjPluginOptions {
  baseURL: string;
  copy: boolean;
  server: boolean;
  link: boolean | string;
}

const setApis = (
  server: ViteDevServer | PreviewServer,
  options: VtjPluginOptions
) => {
  server.middlewares.use(
    bodyParser.json({ type: 'application/json', limit: '50000kb' })
  );
  server.middlewares.use(async (req, res, next) => {
    const reqUrl = req.url || '';
    if (reqUrl.startsWith(options.baseURL)) {
      const data = await router(req);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } else {
      next();
    }
  });
};

const apiServerPlugin = function (options: VtjPluginOptions): Plugin {
  return {
    name: 'vtj-api-plugin',
    apply: 'serve',
    configureServer(server) {
      setApis(server, options);
    },
    configurePreviewServer(server) {
      return () => {
        setApis(server, options);
      };
    }
  };
};

const linkPlugin = function (options: VtjPluginOptions): Plugin {
  let config: ResolvedConfig;
  return {
    name: 'vtj-link-plugin',
    apply: 'serve',
    configResolved(resolvedConfig: ResolvedConfig) {
      config = resolvedConfig;
    },
    transformIndexHtml(html) {
      if (html.includes('VTJ-LINK')) {
        return html;
      }
      if (options.link) {
        const link =
          typeof options.link === 'string' ? options.link : '@vtj/pro/link.js';
        const url = `${config.base}${link}`;
        return html.replace(
          /<\/body>/,
          `<script src="${url}"></script></body>`
        );
      }
      return html;
    }
  };
};

export function createVtjPlugin(options: Partial<VtjPluginOptions> = {}) {
  const opts: VtjPluginOptions = {
    baseURL: '/vtj/api',
    copy: false,
    server: true,
    link: true,
    ...options
  };
  const plugins: Plugin[] = [];
  const proPath = 'node_modules/@vtj/pro/dist';
  const materialsPath1 = 'node_modules/@vtj/materials/dist';
  const materialsPath2 = 'node_modules/@vtj/pro/' + materialsPath1;

  // 复制物料目录
  if (opts.copy) {
    const copyOptions: CopyPluginOption[] = [];
    if (pathExistsSync(materialsPath1)) {
      copyOptions.push({
        from: materialsPath1,
        to: '@vtj/materials'
      });
    } else if (pathExistsSync(materialsPath2)) {
      copyOptions.push({
        from: materialsPath2,
        to: '@vtj/materials'
      });
    } else {
      console.warn(
        '\n @vtj/materials is not installed, please install it first.\n'
      );
    }
    if (copyOptions.length > 0) {
      plugins.push(copyPlugin(copyOptions));
    }
  }

  // 本地开发服务
  if (opts.server) {
    // api 服务
    plugins.push(apiServerPlugin(opts));
    // 静态资源服务
    const staticOptions: StaticPluginOption[] = [];
    if (pathExistsSync(proPath)) {
      staticOptions.push({
        path: '/@vtj/pro',
        dir: proPath
      });
    }
    if (pathExistsSync(materialsPath1)) {
      staticOptions.push({
        path: '/@vtj/materials',
        dir: materialsPath1
      });
    } else if (pathExistsSync(materialsPath2)) {
      staticOptions.push({
        path: '/@vtj/materials',
        dir: materialsPath2
      });
    } else {
      console.warn(
        '\n @vtj/materials is not installed, please install it first.\n'
      );
    }

    if (staticOptions.length > 0) {
      plugins.push(staticPlugin(staticOptions));
    }
  }

  // 链接插件
  if (!!opts.link) {
    plugins.push(linkPlugin(opts));
  }
  return plugins;
}
