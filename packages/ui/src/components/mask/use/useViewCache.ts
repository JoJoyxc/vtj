import { ref, nextTick, ComponentInternalInstance, onMounted } from 'vue';
import { useRoute } from 'vue-router';
export function useViewCache() {
  const aliveRef = ref();
  const aliveKey = ref<any>(Symbol());
  const viewInstance = ref<ComponentInternalInstance | null>(null);
  const route = useRoute();

  const refresh = async () => {
    aliveKey.value = undefined;
    const caches = aliveRef.value._.__v_cache as Map<string, any>;
    caches.delete(route.fullPath);
    await nextTick();
    aliveKey.value = Symbol();
  };

  const getCacheComponent = (key: string) => {
    const caches = aliveRef.value._.__v_cache as Map<string, any>;
    const match = caches.get(key);
    if (match) {
      return match.component as ComponentInternalInstance;
    }
    return null;
  };

  return {
    aliveKey,
    aliveRef,
    refresh,
    getCacheComponent,
    viewInstance
  };
}
