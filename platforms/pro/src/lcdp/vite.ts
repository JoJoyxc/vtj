import { type Plugin, type ResolvedConfig, type ViteDevServer } from 'vite';
import { join } from 'path';
import { pathExistsSync, copySync, emptyDirSync } from '@vtj/node';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import { router } from './service';

export interface VtjPluginOptions {
  baseURL: string;
}

const setStaticDir = (server: ViteDevServer) => {
  const root = process.cwd();
  const proPath = join(root, 'node_modules/@vtj/pro/dist');
  const materialsPath1 = join(root, 'node_modules/@vtj/materials/dist');
  const materialsPath2 = join(
    root,
    'node_modules/@vtj/pro/node_modules/@vtj/materials/dist'
  );
  if (pathExistsSync(proPath)) {
    server.middlewares.use('/@vtj/pro', serveStatic(proPath));
  }

  if (pathExistsSync(materialsPath1)) {
    server.middlewares.use('/@vtj/materials', serveStatic(materialsPath1));
  } else if (pathExistsSync(materialsPath2)) {
    server.middlewares.use('/@vtj/materials', serveStatic(materialsPath2));
  } else {
    console.warn(
      '\n @vtj/materials is not installed, please install it first.\n'
    );
  }
};

const setApis = (server: ViteDevServer, options: VtjPluginOptions) => {
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

const copy = (outDir: string) => {
  const root = process.cwd();
  const materialsPath1 = join(root, 'node_modules/@vtj/materials/dist');
  const materialsPath2 = join(
    root,
    'node_modules/@vtj/pro/node_modules/@vtj/materials/dist'
  );
  const target = join(root, `${outDir}/@vtj/materials`);

  if (pathExistsSync(materialsPath1)) {
    emptyDirSync(target);
    copySync(materialsPath1, target);
  } else if (pathExistsSync(materialsPath2)) {
    emptyDirSync(target);
    copySync(materialsPath2, target);
  } else {
    console.warn(
      '\n @vtj/materials is not installed, please install it first.\n'
    );
  }
};

const copyPlugin = function (): Plugin {
  let config: ResolvedConfig;
  return {
    name: 'vtj-copy-plugin',
    apply: 'build',
    configResolved(resolvedConfig: ResolvedConfig) {
      config = resolvedConfig;
    },
    closeBundle() {
      const outDir = config.build.outDir;
      copy(outDir);
    }
  };
};

const devPlugin = function (options: VtjPluginOptions): Plugin {
  return {
    name: 'vtj-dev-plugin',
    apply: 'serve',
    configureServer(server) {
      setStaticDir(server);
      setApis(server, options);
    }
  };
};

export function VtjPlugin(options: Partial<VtjPluginOptions> = {}): Plugin[] {
  const opts = {
    baseURL: '/vtj/api',
    ...options
  };
  return [copyPlugin(), devPlugin(opts)];
}
