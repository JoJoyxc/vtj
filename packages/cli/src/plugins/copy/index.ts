import { type Plugin, type ResolvedConfig } from 'vite';
import { copySync, emptyDirSync } from '@vtj/node';
import { resolve } from 'path';
export interface CopyPluginOption {
  from: string;
  to: string;
}
export const copyPlugin = function (options: CopyPluginOption[] = []): Plugin {
  let config: ResolvedConfig;
  return {
    name: 'vtj-copy-plugin',
    apply: 'build',
    configResolved(resolvedConfig: ResolvedConfig) {
      config = resolvedConfig;
    },
    closeBundle() {
      const outDir = config.build.outDir;
      for (const { from, to } of options) {
        if (from !== '/') {
          emptyDirSync(resolve(from));
        }
        copySync(resolve(from), resolve(outDir, to));
      }
    }
  };
};
