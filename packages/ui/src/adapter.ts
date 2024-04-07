import { type InjectionKey, inject } from 'vue';
export const ADAPTER_KEY: InjectionKey<Adapter> = Symbol('ADAPTER_KEY');
export function useAdapter() {
  return inject(ADAPTER_KEY, {} as Adapter);
}

export interface Adapter {}
