import { shallowRef, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { MaskProps, MaskEmits } from '../types';
import { MenuDataItem, Emits, createDialog } from '../../';
import { arrayToMap } from '@vtj/utils';

function toFlat(
  array: MenuDataItem[],
  menuAdapter?: (menu: MenuDataItem) => MenuDataItem
) {
  let result: MenuDataItem[] = [];
  array.forEach((n) => {
    n = menuAdapter ? menuAdapter(n) : n;
    if (!n.children) {
      result.push(n);
    } else {
      result = result.concat(toFlat(n.children, menuAdapter));
    }
  });
  return result;
}

export function useMenus(props: MaskProps, emit: Emits<MaskEmits>) {
  const router = useRouter();
  const collapsed = ref(false);
  const favorite = ref(false);
  const keyword = ref('');
  const menus = shallowRef<MenuDataItem[]>([]);
  const active = ref<MenuDataItem | null>(null);
  const flatMenus = computed(() => toFlat(menus.value, props.menuAdapter));
  const menusMap = computed(() => arrayToMap(flatMenus.value, 'id'));

  const getMenuByUrl = (url: string) => {
    return flatMenus.value.find((n) => n.url === url);
  };

  (async () => {
    menus.value =
      typeof props.menus === 'function'
        ? (await props.menus()) || []
        : props.menus ?? [];
  })();

  const search = (val: string) => {
    keyword.value = val;
  };

  const select = (menu: MenuDataItem) => {
    const activeMenu = menusMap.value.get(menu.id);
    if (!activeMenu) return;
    const { type = 'route', url, title, icon } = activeMenu;
    emit('select', menu);
    if (type === 'route') {
      active.value = activeMenu;
    }
    if (!url) return;
    if (type === 'route' && router) {
      if (
        url.startsWith('https:') ||
        url.startsWith('http:') ||
        url.startsWith('//')
      ) {
        return window.open(url);
      }
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
    flatMenus,
    menusMap,
    search,
    select,
    active,
    getMenuByUrl
  };
}
