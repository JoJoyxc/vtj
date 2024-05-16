import {
  type Plugin,
  type App,
  type InjectionKey,
  inject,
  getCurrentInstance
} from 'vue';
import type { GridCustomInfo } from './components';
import type { VXETableConfigOptions } from 'vxe-table';
export const ADAPTER_KEY: InjectionKey<Adapter> = Symbol('ADAPTER_KEY');

export interface UploaderResponse {
  url: string;
  name?: string;
  [index: string]: any;
}

export type Uploader = (
  file: File
) => Promise<string | UploaderResponse | null>;

export function useAdapter(): Adapter {
  const instance = getCurrentInstance();
  const adapter = instance?.appContext.config.globalProperties.$adapter;
  if (adapter) {
    return adapter;
  }
  return inject(ADAPTER_KEY, {} as Adapter);
}

export interface Adapter {
  uploader?: Uploader;
  vxeConfig?: VXETableConfigOptions;
  getCustom?: (id: string) => Promise<GridCustomInfo>;
  saveCustom?: (info: GridCustomInfo) => Promise<any>;
  [index: string]: any;
}

export const AdapterPlugin: Plugin = {
  install(app: App, options: Adapter = {}) {
    app.config.globalProperties.$adapter = options;
    app.provide(ADAPTER_KEY, options);
  }
};
