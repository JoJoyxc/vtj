import { ref, computed } from 'vue';
import { ComponentDescription } from '../core';

export function useComponentsSearch(components?: ComponentDescription[]) {
  const searchKey = ref('');
  const searchResult = computed(() => {
    const key = searchKey.value.toLowerCase();
    if (!key || !components) return [];
    return components.filter((c) => {
      return (
        c.name.toLowerCase().includes(key) ||
        c.title?.toLowerCase().includes(key)
      );
    });
  });
  return {
    searchKey,
    searchResult
  };
}
