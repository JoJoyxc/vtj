import {
  shallowRef,
  computed,
  ComputedRef,
  Ref,
  ref,
  watch,
  nextTick,
  inject
} from 'vue';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { HomeFilled } from '@element-plus/icons-vue';
import { useElementSize } from '@vueuse/core';
import { arrayToMap, delay, upperFirstCamelCase } from '@vtj/utils';
import {
  MaskTab,
  MaskProps,
  MaskEmits,
  TAB_ITEM_WIDTH,
  MASK_INSTANCE_KEY
} from './types';
import { Emits } from '../shared';
import { ActionMenuItem, ActionProps, MenuDataItem, createDialog } from '../';
import { Loader } from './Loader';
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

function createHomeTab(home?: string | MaskTab): MaskTab {
  return Object.assign(
    { url: '/', icon: HomeFilled },
    typeof home === 'string' ? { url: home, icon: HomeFilled } : home || {}
  );
}

function isEqual(a: MaskTab, b: MaskTab) {
  return a.url === b.url;
}

export type TabCreator = () => Promise<Partial<MaskTab>> | Partial<MaskTab>;

export class MaskFactory {
  tabCreators: Record<string, TabCreator> = {};
  flatMenus: ComputedRef<MenuDataItem[]>;
  menusMap: ComputedRef<Map<string | number, MenuDataItem>>;
  collapsed: Ref<boolean> = ref(false);
  favorite: Ref<boolean> = ref(false);
  keyword: Ref<string> = ref('');
  homeTab: ComputedRef<MaskTab>;
  showTabs: ComputedRef<MaskTab[]>;
  dropdownTabs: ComputedRef<MaskTab[]>;
  tabValue: Ref<string | undefined> = ref();
  currentTab: ComputedRef<MaskTab | undefined>;
  menus = shallowRef<MenuDataItem[]>([]);
  favorites = shallowRef<MenuDataItem[]>([]);
  active = ref<MenuDataItem | null>(null);
  tabRef = ref();
  aliveKey = ref<symbol | undefined>(Symbol());
  aliveExclude = ref<(string | RegExp)[]>([]);
  tabs = shallowRef<MaskTab[]>([]);
  loader = new Loader();
  constructor(
    public props: MaskProps,
    public emit: Emits<MaskEmits>,
    public route: RouteLocationNormalizedLoaded,
    public router: Router
  ) {
    const { width } = useElementSize(this.tabRef);
    const showCount = computed(() => Math.floor(width.value / TAB_ITEM_WIDTH));
    this.showTabs = computed(() =>
      this.tabs.value.slice(0, showCount.value).filter((n) => !n.dialog)
    );
    this.dropdownTabs = computed(() => this.tabs.value.slice(showCount.value));
    this.homeTab = computed(() => createHomeTab(props.home));
    this.flatMenus = computed(() =>
      toFlat(this.menus.value, props.menuAdapter)
    );
    this.menusMap = computed(() => arrayToMap(this.flatMenus.value, 'id'));
    this.currentTab = computed(() => this.getTab(this.tabValue.value));
    watch(() => route.fullPath, this.initTab.bind(this));
    this.init();
  }

  async init() {
    const { menus, favorites, props, route } = this;
    menus.value =
      typeof props.menus === 'function'
        ? (await props.menus()) || []
        : props.menus ?? [];

    favorites.value =
      typeof props.favorites === 'function'
        ? (await props.favorites()) || []
        : props.favorites ?? [];

    this.initTab(route.fullPath);
  }

  private async initTab(fullPath: string) {
    const isHome = this.homeTab.value.url === fullPath;
    const menu = this.getMenuByUrl(fullPath);
    if (isHome) {
      this.tabValue.value = fullPath;
    } else {
      await nextTick();
      const { url = fullPath, icon, title = '新建标签页' } = menu || {};
      const tabCreator = this.tabCreators[url];
      const tab: MaskTab = Object.assign(
        { url, icon, title, menu },
        tabCreator ? await tabCreator() : {}
      );
      this.addTab(tab);
    }
    if (menu) {
      await nextTick();
      this.active.value = menu;
    }
  }

  getTab(fullPath?: string) {
    const { tabs, homeTab } = this;
    if (!fullPath) return undefined;
    const isHome = homeTab.value.url === fullPath;
    if (isHome) {
      return homeTab.value;
    }
    return tabs.value.find((n) => n.url === fullPath);
  }

  addTab(tab: MaskTab) {
    const { tabs, props } = this;
    const match = tabs.value.find((n) => isEqual(n, tab));
    if (match) {
      this.activeTab(match);
    } else {
      tabs.value = [tab, ...tabs.value].splice(0, props.tabs || 0);
      this.activeTab(tab);
    }
  }

  updateTab(tab: MaskTab) {
    const { tabs } = this;
    const index = tabs.value.findIndex((n) => isEqual(n, tab));
    if (index >= 0) {
      const match = tabs.value[index];
      const items = [...tabs.value];
      items.splice(index, 1, Object.assign(match, tab, { id: Symbol() }));
      tabs.value = items;
    }
  }

  activeTab(tab: MaskTab) {
    const { tabValue, router, route } = this;
    tabValue.value = tab.url;
    if (route.fullPath !== tabValue.value) {
      router.push(tabValue.value).catch((e) => e);
    }
  }

  isCurrentTab(tab: MaskTab) {
    const { route } = this;
    return route.fullPath === tab.url;
  }

  moveToShow(tab: MaskTab) {
    const { tabs } = this;
    const items = tabs.value.filter((n) => !isEqual(n, tab));
    tabs.value = [tab, ...items];
    this.activeTab(tab);
  }

  async removeTab(tab: MaskTab) {
    const { tabs, tabValue } = this;
    const ret = await ElMessageBox.confirm('是否关闭页签', '提示', {
      type: 'warning'
    }).catch((e) => false);
    if (!ret) return;

    tabs.value = tabs.value.filter((n) => !isEqual(n, tab));
    // 删除的是激活tab

    if (tabValue.value === tab.url) {
      const first = tabs.value[0];
      this.activeTab(first ? first : this.homeTab.value);
    }
    await this.removeCache(tab.url);
  }

  async removeAllTabs() {
    const { tabs } = this;
    const ret = await ElMessageBox.confirm('是否关闭全部页签', '提示', {
      type: 'warning'
    }).catch((e) => false);
    if (!ret) return;
    tabs.value = [];
    await this.clearCache();
    this.activeTab(this.homeTab.value);
  }

  async removeOtherTabs() {
    const { tabs, tabValue } = this;
    const ret = await ElMessageBox.confirm('是否关闭其他页签', '提示', {
      type: 'warning'
    }).catch((e) => false);
    if (!ret) return;
    const keys = tabs.value
      .filter((n) => n.url !== tabValue.value)
      .map((n) => n.url);
    this.removeCache(keys);
    tabs.value = tabs.value.filter((n) => n.url === tabValue.value);
  }

  async registerTabCreator(
    fullPath: string,
    tab: Partial<MaskTab> | TabCreator
  ) {
    const creator = typeof tab === 'function' ? tab : async () => tab;
    this.tabCreators[fullPath] = creator;
    this.updateTab({
      url: fullPath,
      ...(await creator())
    });
  }

  getMenuByUrl(url: string) {
    return this.flatMenus.value.find((n) => n.url === url);
  }

  selectMenu(menuId: string | number | MenuDataItem): any {
    const { menusMap, emit, active, router } = this;
    const menu = menusMap.value.get(
      typeof menuId === 'object' ? menuId.id : menuId
    );
    if (!menu) {
      console.warn('找不到菜单', menuId);
      return;
    }
    emit('select', menu);
    const { type = 'route', url, title, icon } = menu;
    if (type === 'route') {
      active.value = menu;
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
      return createDialog({
        resizable: true,
        bodyPadding: false,
        width: '80%',
        height: '80%',
        title,
        icon,
        src: url
      });
    }
  }

  searchMenu(val: string) {
    this.keyword.value = val;
  }

  addFavorite(item: MenuDataItem) {
    const { favorites, props } = this;
    favorites.value = [item, ...favorites.value];
    if (props.addFavorite) {
      props.addFavorite(item);
    }
  }

  removeFavorite(item: MenuDataItem) {
    const { favorites, props } = this;
    favorites.value = favorites.value.filter((n) => n.id !== item.id);

    if (props.removeFavorite) {
      props.removeFavorite(item);
    }
  }

  isFavorite(item: MenuDataItem) {
    const { favorites } = this;
    return !!favorites.value.find((n) => n === item || n.id === item.id);
  }

  toggleFavorite(item: MenuDataItem) {
    this.isFavorite(item) ? this.removeFavorite(item) : this.addFavorite(item);
  }

  async refresh(tab: MaskTab) {
    const { aliveKey } = this;
    aliveKey.value = undefined;
    await this.removeCache(tab.url);
    await delay(50);
    aliveKey.value = Symbol();
  }

  async removeCache(key: string | string[]) {
    const { aliveExclude } = this;
    const keys = Array.isArray(key) ? key : [key];
    const names = keys.map((n) => upperFirstCamelCase(n));
    aliveExclude.value = names;
    await nextTick();
    aliveExclude.value = [];
  }

  async clearCache() {
    const { aliveExclude } = this;
    aliveExclude.value = [/\w+/];
    await nextTick();
    aliveExclude.value = [];
  }

  changeTab(tab: MaskTab) {
    this.router.push(tab.url).catch((e) => e);
  }

  switchToDialog(tab: MaskTab) {
    tab.route = this.route;
    tab.dialog = {
      onMinimized: () => {
        this.switchToTab(tab);
      },
      onClose: () => {
        this.closeDialog(tab);
      }
    };
    this.updateTab(tab);

    if (this.isCurrentTab(tab)) {
      this.changeTab(this.homeTab.value);
    }
  }

  async closeDialog(tab: MaskTab) {
    const { tabs } = this;
    tab.route = undefined;
    tab.dialog = undefined;
    this.updateTab(tab);
    tabs.value = tabs.value.filter((n) => !isEqual(n, tab));
    await this.removeCache(tab.url);
  }

  switchToTab(tab: MaskTab) {
    tab.route = null as any;
    tab.dialog = undefined;
    this.updateTab(tab);
  }

  onActionClick(action: ActionProps) {
    this.emit('actionClick', action);
  }

  onActionCommand(action: ActionProps, item: ActionMenuItem) {
    this.emit('actionCommand', action, item);
  }
}

export function useMask() {
  return inject(MASK_INSTANCE_KEY, null) as MaskFactory;
}
