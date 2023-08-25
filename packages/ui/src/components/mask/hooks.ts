import { inject, ComponentInternalInstance } from 'vue';
import { MaskInstance } from './types';
export function useMask() {
  const instance = inject('$mask', null) as ComponentInternalInstance | null;
  return instance?.proxy as MaskInstance | null;
}
