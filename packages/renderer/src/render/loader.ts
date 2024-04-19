import type { DefineComponent } from 'vue';
import type { NodeFrom, BlockSchema } from '@vtj/core';
import { createRenderer, type CreateRendererOptions } from './block';
import { ContextMode } from '../constants';
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
  getDsl: (id: string) => Promise<BlockSchema | null>;
  getDslByUrl: (url: string) => Promise<BlockSchema | null>;
  options: Partial<CreateRendererOptions>;
}

export function createLoader(opts: CreateLoaderOptions): BlockLoader {
  const { getDsl, getDslByUrl, options } = opts;
  return (name: string, from?: NodeFrom, Vue: any = globalVue) => {
    if (!from || typeof from === 'string') return name;
    if (from.type === 'Schema' && from.id) {
      return Vue.defineAsyncComponent(async () => {
        const dsl = await getDsl(from.id);
        return dsl
          ? createRenderer({
              ...options,
              Vue,
              dsl,
              mode: ContextMode.Runtime,
              loader: createLoader(opts)
            }).renderer
          : null;
      });
    }

    if (from.type === 'UrlSchema' && from.url) {
      return Vue.defineAsyncComponent(async () => {
        const dsl = await getDslByUrl(from.url);
        return dsl
          ? createRenderer({
              ...options,
              Vue,
              dsl,
              mode: ContextMode.Runtime,
              loader: createLoader(opts)
            }).renderer
          : null;
      });
    }

    // todo: 实现 UrlSchema  Remote
    return name;
  };
}
