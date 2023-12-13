import type { DefineComponent } from 'vue';
import type { NodeFrom, BlockSchema } from '@vtj/core';
import { createRenderer, type CreateRendererOptions } from './block';
import * as globalVue from 'vue';

export type BlockLoader = (
  name: string,
  from?: NodeFrom,
  Vue?: any
) => string | DefineComponent;

export const defaultLoader: BlockLoader = (name: string) => {
  // 默认不处理 from
  return name;
};

export interface CreateLoaderOptions {
  getFile: (id: string) => Promise<BlockSchema | null>;
  options: Partial<CreateRendererOptions>;
}

export function createLoader(opts: CreateLoaderOptions): BlockLoader {
  const { getFile, options } = opts;
  return (name: string, from?: NodeFrom, Vue: any = globalVue) => {
    if (!from || typeof from === 'string') return name;
    if (from.type === 'Schema') {
      return Vue.defineAsyncComponent(async () => {
        const dsl = await getFile(from.id);
        return dsl
          ? createRenderer({
              ...options,
              Vue,
              dsl,
              loader: createLoader(opts)
            })
          : null;
      });
    }

    // todo: 实现 UrlSchema  Remote
    return name;
  };
}
