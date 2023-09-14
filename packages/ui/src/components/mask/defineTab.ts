import { MaskTab } from './types';
import { TabCreator, useMask } from './MaskFactory';
import { computed, watch, reactive } from 'vue';
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router';

export function defineTab(options: Partial<MaskTab> | TabCreator = {}) {
  const route = reactive(
    Object.assign({}, useRoute())
  ) as RouteLocationNormalizedLoaded;
  const mask = useMask();
  if (!mask) {
    console.warn(`defineTab必须要在Mask环境中使用`);
  }
  const fullPath = route.fullPath;
  mask.registerTabCreator(fullPath, options);

  const tab = computed(() => {
    const isHome = mask.homeTab.value.url === fullPath;
    return isHome
      ? mask.homeTab.value
      : mask.tabs.value.find((n) => n.url === fullPath);
  });

  watch(
    () => tab.value,
    (v) => {
      Object.assign(route, v?.route || {});
    }
  );

  return {
    tab,
    route
  };
}
