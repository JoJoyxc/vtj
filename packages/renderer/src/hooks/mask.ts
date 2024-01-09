import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useProvider } from '../provider';

export function useMask() {
  const provider = useProvider();
  const route = useRoute();
  const disabled = ref(false);

  watchEffect(() => {
    const { name, params, meta } = route;
    if (name === 'VtjPage') {
      const page = provider.getPage(params.id as string);
      disabled.value = !page?.mask;
    } else {
      disabled.value = !meta.mask;
    }
  });

  return {
    disabled
  };
}
