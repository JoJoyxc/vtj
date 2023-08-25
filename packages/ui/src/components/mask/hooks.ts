import { inject, shallowReactive, ShallowReactive, shallowRef } from 'vue';
import { MaskProps, MaskState, MASK_STATE_KEY } from './types';
import { MenuDataItem } from '../';

export function useInjectState() {
  return inject(MASK_STATE_KEY, null) as ShallowReactive<MaskState>;
}

export function useState(props: MaskProps) {
  const menus = shallowRef<MenuDataItem[]>([]);
  const favorites = shallowRef<MenuDataItem[]>([]);
  (async () => {
    menus.value =
      typeof props.menus === 'function'
        ? (await props.menus()) || []
        : props.menus ?? [];

    favorites.value =
      typeof props.favorites === 'function'
        ? (await props.favorites()) || []
        : props.favorites ?? [];
  })();

  return shallowReactive<MaskState>({
    menus,
    favorites
  });
}
