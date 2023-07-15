import { ComputedRef } from 'vue';
import { useBlock } from './useBlock';
import { useMask } from './useMask';

export function usePage(id: ComputedRef<string | undefined>) {
  const { renderer, dsl, deps, loading } = useBlock(id);
  const { page } = useMask(id);
  return {
    renderer,
    dsl,
    deps,
    loading,
    page
  };
}
