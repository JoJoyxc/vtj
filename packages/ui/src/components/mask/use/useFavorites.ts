import { shallowRef } from 'vue';
import { MaskProps } from '../types';
import { MenuDataItem } from '../../';
export function useFavorites(props: MaskProps) {
  const favorites = shallowRef<MenuDataItem[]>([]);

  (async () => {
    favorites.value =
      typeof props.favorites === 'function'
        ? (await props.favorites()) || []
        : props.favorites ?? [];
  })();

  const addFavorite = (item: MenuDataItem) => {
    favorites.value = [item, ...favorites.value];
    if (props.addFavorite) {
      props.addFavorite(item);
    }
  };

  const removeFavorite = (item: MenuDataItem) => {
    favorites.value = favorites.value.filter((n) => n.id !== item.id);

    if (props.removeFavorite) {
      props.removeFavorite(item);
    }
  };

  const isFavorite = (item: MenuDataItem) => {
    return !!favorites.value.find((n) => n === item || n.id === item.id);
  };

  const toggleFavorite = (item: MenuDataItem) => {
    isFavorite(item) ? removeFavorite(item) : addFavorite(item);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite
  };
}
