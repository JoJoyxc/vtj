import { type Plugin } from 'vite';
import { resolve } from 'path';
import serveStatic from 'serve-static';

export function staticServer(dirs: string[]): Plugin {
  return {
    name: 'vtj-static-server',
    configureServer(server) {
      for (let dir of dirs) {
        server.middlewares.use(serveStatic(resolve(dir)));
      }
    },
    configurePreviewServer(server) {
      for (let dir of dirs) {
        server.middlewares.use(serveStatic(resolve(dir)));
      }
    }
  };
}
