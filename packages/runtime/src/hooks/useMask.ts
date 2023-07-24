import { ComputedRef, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProvider } from './useProvider';
import { isMask } from '../shared';
import { XSimpleMask, BaseMaskProps } from '@vtj/ui';

export function useMask(id: ComputedRef<string | undefined>) {
  const provider = useProvider();
  const route = useRoute();
  if (!provider) {
    throw new Error('VTJ Provider is not found');
  }

  const { Mask = XSimpleMask } = provider.options.components || {};

  const page = computed(() => {
    const pages = provider?.pages?.value || [];
    const blocks = provider?.blocks?.value || [];
    return (
      pages.find((n) => id.value === n.id) ||
      blocks.find((n) => id.value === n.id)
    );
  });

  const maskProps = computed<BaseMaskProps>(() => {
    const { project } = provider.options;
    return {
      project,
      menu: {
        data: provider.dsl.value?.pages || []
      },
      preview: route.path.startsWith('/preview')
    } as BaseMaskProps;
  });

  const maskable = computed(() => isMask(page.value));
  return {
    Mask,
    page,
    maskable,
    maskProps
  };
}
