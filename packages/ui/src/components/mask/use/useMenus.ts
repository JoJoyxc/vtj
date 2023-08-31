import { shallowRef, computed, ref } from 'vue';
import { Router } from 'vue-router';
import { MaskProps, MaskEmits } from '../types';
import { MenuDataItem, Emits, createDialog } from '../../';
import { HomeFilled } from '@element-plus/icons-vue';

const HOME_ID = '__vtj__home__';

export function useMenus(
  props: MaskProps,
  emit: Emits<MaskEmits>,
  router: Router
) {
  const homeMenu: MenuDataItem = {
    id: HOME_ID,
    icon: HomeFilled,
    url: props.homepage
  };

  const collapsed = ref(false);
  const favorite = ref(false);
  const keyword = ref('');
  const menus = shallowRef<MenuDataItem[]>([]);
  const favorites = shallowRef<MenuDataItem[]>([]);
  const active = ref<MenuDataItem | null>(homeMenu);
  const toFlat = (array: MenuDataItem[]) => {
    let result: MenuDataItem[] = [];
    array.forEach((n) => {
      if (!n.children) {
        result.push(n);
      } else {
        result = result.concat(toFlat(n.children));
      }
    });
    return result;
  };

  const flatMenus = computed(() => toFlat(menus.value));

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

  const addFavorite = (item: MenuDataItem) => {
    favorites.value = [...favorites.value, item];
  };

  const removeFavorite = (item: MenuDataItem) => {
    favorites.value = favorites.value.filter(
      (n) => n !== item || n.id !== item.id
    );
  };

  const search = (val: string) => {
    keyword.value = val;
  };

  const select = (menu: MenuDataItem) => {
    const { type = 'route', url, title, icon } = menu;
    emit('select', menu);
    if (type === 'route') {
      active.value = menu;
    }
    if (props.manual || !url) return;
    if (type === 'route' && router) {
      return router.push(url).catch((e) => e);
    }
    if (type === 'window') {
      return window.open(url);
    }
    if (type === 'dialog') {
      createDialog({
        bodyPadding: false,
        width: '80%',
        height: '80%',
        title,
        icon,
        src: url
      });
    }
  };

  return {
    collapsed,
    favorite,
    keyword,
    menus,
    favorites,
    flatMenus,
    addFavorite,
    removeFavorite,
    search,
    select,
    active,
    homeMenu
  };
}
