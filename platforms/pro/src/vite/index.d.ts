import { type Plugin } from 'vite';
export interface VtjPluginOptions {
  baseURL: string;
  copy: boolean;
  server: boolean;
  link: boolean | string;
}
export declare function createVtjPlugin(
  options?: Partial<VtjPluginOptions>
): Plugin<any>[];
