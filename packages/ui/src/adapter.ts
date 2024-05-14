import { type Plugin, type App, type InjectionKey, inject } from 'vue';
export const ADAPTER_KEY: InjectionKey<Adapter> = Symbol('ADAPTER_KEY');

export const ADAPTER_KEY_STRING = '__VTJ_UI_ADAPTER__';

export interface UploaderResponse {
  url: string;
  name?: string;
  [index: string]: any;
}

export type Uploader = (
  file: File
) => Promise<string | UploaderResponse | null>;

export function useAdapter() {
  return inject(ADAPTER_KEY) || inject(ADAPTER_KEY_STRING, {} as Adapter);
}

export interface Adapter {
  uploader?: Uploader;
}

export const AdapterPlugin: Plugin = {
  install(app: App, options: Adapter = {}) {
    app.provide(ADAPTER_KEY, options);
    app.provide(ADAPTER_KEY_STRING, options);
  }
};
