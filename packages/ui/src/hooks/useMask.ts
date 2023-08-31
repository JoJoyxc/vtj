import { inject, ComponentInternalInstance } from 'vue';
import { MASK_INSTANCE_KEY } from '../components';

export function useMask() {
  return inject(MASK_INSTANCE_KEY, null) as ComponentInternalInstance;
}
