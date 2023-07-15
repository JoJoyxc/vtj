import type { DefineComponent } from 'vue';
import type { NodeFrom, BlockSchema } from '../core';
import { createBlockRenderer, ICreateBlockRendererOptions } from './block';
export type ComponentLoader = (
  Vue: any,
  name: string,
  from?: NodeFrom
) => string | DefineComponent;

export const defaultLoader: ComponentLoader = (
  Vue: any,
  name: string,
  from: NodeFrom = ''
) => {
  // 默认不处理 from
  return name;
};

export interface ICreateLoaderOptions {
  getFile: (id: string) => Promise<BlockSchema | null>;
  options: Partial<ICreateBlockRendererOptions>;
}

export function createLoader(opts: ICreateLoaderOptions): ComponentLoader {
  const { getFile, options } = opts;
  return (Vue: any, name: string, from?: NodeFrom) => {
    if (!from || typeof from === 'string') return name;
    if (from.type === 'Schema') {
      return Vue.defineAsyncComponent(async () => {
        const dsl = await getFile(from.id);
        return dsl
          ? createBlockRenderer({
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
