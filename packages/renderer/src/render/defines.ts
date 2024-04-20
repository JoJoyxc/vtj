import { defineAsyncComponent } from 'vue';
import { type NodeFromPlugin } from '@vtj/core';
import { type Provider } from '../provider';
import { createRenderer } from './block';
import { ContextMode } from '../constants';
import { createLoader, getPlugin } from './loader';
import { loadCssUrl } from '../utils';

export interface DefineUrlSchemaComponent {
  provider: Provider;
  name: string;
  url: string;
}

export function defineUrlSchemaComponent(options: DefineUrlSchemaComponent) {
  const { provider, name, url } = options;

  return defineAsyncComponent(async () => {
    const dsl = await provider.service.getDslByUrl(url);
    console.log(url, dsl);
    if (dsl) {
      dsl.name = name;
      const { library, components, apis } = provider;
      const options = {
        mode: ContextMode.Runtime,
        Vue: library.Vue,
        components,
        libs: library,
        apis,
        window
      };
      const loader = createLoader({
        getDsl: async (id: string) => {
          return (await provider.getDsl(id)) || null;
        },
        getDslByUrl: async (url: string) => {
          return (await provider.service.getDslByUrl(url)) || null;
        },
        options
      });

      const { renderer } = createRenderer({
        ...options,
        dsl,
        loader
      });
      return renderer;
    }
    return null;
  });
}

export function definePluginComponent(from: NodeFromPlugin) {
  return defineAsyncComponent(async () => {
    const plugin = await getPlugin(from, window);
    if (plugin) {
      loadCssUrl(plugin.css);
      return plugin.component as any;
    }
    return null;
  });
}
