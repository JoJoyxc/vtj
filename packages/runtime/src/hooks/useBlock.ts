import {
  ComputedRef,
  ref,
  getCurrentInstance,
  markRaw,
  computed,
  watch
} from 'vue';
import { useProvider } from './useProvider';
import { createBlockRenderer, createLoader } from '../shared';

export function useBlock(id: ComputedRef<string | undefined>) {
  const provider = useProvider();
  const instance = getCurrentInstance();
  const dsl = ref();
  const deps = ref();
  const loading = ref(false);
  if (!provider) {
    throw new Error('VTJ Provider is not found');
  }

  watch(
    id,
    async (v, o) => {
      loading.value = !!v;
      deps.value = v ? await provider.setup(instance?.appContext.app) : null;
      dsl.value = v ? await provider.service.getFile(v) : null;
      loading.value = false;
    },
    { immediate: true }
  );

  const renderer = computed(() => {
    if (dsl.value && deps.value) {
      const { apis, components, libs } = deps.value;
      const Vue = window.Vue;
      const loader = createLoader({
        getFile: provider.service.getFile.bind(provider.service),
        options: { libs, components, apis, Vue }
      });
      return markRaw(
        createBlockRenderer({
          dsl: dsl.value,
          libs,
          components,
          apis,
          Vue,
          loader
        })
      );
    }
    return null;
  });

  return {
    renderer,
    dsl,
    deps,
    loading
  };
}
