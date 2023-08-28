import {
  inject,
  shallowReactive,
  ShallowReactive,
  shallowRef,
  computed,
  nextTick
} from 'vue';
import { MaskProps, MaskState, MASK_STATE_KEY, MaskEmits } from './types';
import { MenuDataItem, ShortEmits, createDialog } from '../';
import { useRouter, useRoute, RouteLocationNormalizedLoaded } from 'vue-router';
import { HomeFilled } from '@element-plus/icons-vue';

export function useInjectState() {
  return inject(MASK_STATE_KEY, null) as ShallowReactive<MaskState>;
}

export function useState(props: MaskProps) {
  const route = useRoute();
  const menus = shallowRef<MenuDataItem[]>([]);
  const favorites = shallowRef<MenuDataItem[]>([]);
  const activeMenu = shallowRef<MenuDataItem | null | undefined>(null);
  const home = shallowRef<MenuDataItem | null | undefined>(null);
  const tabs = shallowRef<MenuDataItem[]>([]);
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

  const getHome = () => {
    return Object.assign(
      {
        id: '__vtj__home__',
        icon: HomeFilled,
        url: '/'
      },
      props.home || {}
    ) as MenuDataItem;
  };

  const defaultActiveMenu =
    props.defaultActiveMenu ??
    ((to: RouteLocationNormalizedLoaded) => {
      return flatMenus.value.find((n) => n.url === to.fullPath);
    });

  (async () => {
    menus.value =
      typeof props.menus === 'function'
        ? (await props.menus()) || []
        : props.menus ?? [];

    favorites.value =
      typeof props.favorites === 'function'
        ? (await props.favorites()) || []
        : props.favorites ?? [];

    home.value = getHome();
    const active = defaultActiveMenu(route, flatMenus.value);
    if (active && active.url !== home.value.url) {
      tabs.value = [active];
      activeMenu.value = active;
    } else {
      activeMenu.value = home.value;
    }
  })();

  return shallowReactive<MaskState>({
    menus,
    favorites,
    flatMenus,
    activeMenu,
    tabs,
    home
  });
}

export function useMethods(
  props: MaskProps,
  state: MaskState,
  emit: ShortEmits<MaskEmits>
) {
  const router = useRouter();
  const selectMenu = (menu: MenuDataItem) => {
    const { type = 'route', url, title, icon } = menu;
    emit('menuSelect', menu);
    if (type === 'route') {
      addTab(menu);
    }
    if (props.manualMenu || !url) return;
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

  const addTab = (menu: MenuDataItem) => {
    const current = state.tabs.value.find((n) => n.id === menu.id);
    if (current) {
      state.activeMenu.value = current;
    } else {
      state.tabs.value = [menu, ...state.tabs.value];
      state.activeMenu.value = menu;
    }
  };

  const removeTab = async (menu: MenuDataItem) => {
    state.tabs.value = state.tabs.value.filter((n) => n.id !== menu.id);
    if (menu.id === state.activeMenu.value?.id) {
      const first = state.tabs.value[0];
      if (first) {
        await nextTick();
        selectMenu(first);
      } else {
        onHomeClick();
      }
    }
  };

  const onTabClick = (menu: MenuDataItem) => {
    selectMenu(menu);
  };

  const onHomeClick = () => {
    const home = state.home.value;
    if (home?.url) {
      state.activeMenu.value = home;
      router.push(home.url).catch((e) => e);
    }
  };

  return {
    addTab,
    removeTab,
    selectMenu,
    onTabClick,
    onHomeClick
  };
}
