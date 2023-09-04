import { shallowRef, watch, computed, ref, Ref } from 'vue';
import { MaskProps, MaskEmits, TAB_ITEM_WIDTH, MaskTab } from '../types';
import { MenuDataItem, Emits } from '../../';
import { useElementSize } from '@vueuse/core';
import { ElMessageBox } from 'element-plus';
import type { Router, RouteLocationRaw } from 'vue-router';

export function useTabs(
  props: MaskProps,
  emit: Emits<MaskEmits>,
  router: Router,
  active: Ref<MenuDataItem | null | undefined>,
  select: (menu: MenuDataItem) => void,
  homeMenu: MenuDataItem
) {
  const homeTab = computed<MaskTab>(() => {
    return {
      menu: homeMenu,
      closable: false
    };
  });
  // tabs 组件引用
  const tabRef = ref();
  const { width } = useElementSize(tabRef);
  // tabs数据项
  const tabs = shallowRef<MaskTab[]>([]);
  // 当前激活得Tab菜单id
  const tabsValue = computed(() => active.value?.id || homeMenu.id);
  // baner上可以展示的tab数量
  const showCount = computed(() => Math.floor(width.value / TAB_ITEM_WIDTH));
  // banner 上的tabs项
  const showTabs = computed(() => tabs.value.slice(0, showCount.value));
  // 放在下拉菜单的tabs项
  const dropdownTabs = computed(() => tabs.value.slice(showCount.value));

  // 判断是否激活的tab
  const isActiveTab = (tab: MaskTab) => {
    return tabsValue.value === tab.menu.id;
  };

  // 判断两个tab项是否相等
  const isEqual = (a: MaskTab, b: MaskTab) => {
    return a === b || a.menu.id === b.menu.id;
  };

  // 切换tab
  const activeTab = (tab: MaskTab) => {
    if (!isActiveTab(tab)) {
      select(tab.menu);
    }
  };

  // 切换到首页
  const activeHome = () => {
    active.value = homeTab.value.menu;
    const url = homeTab.value.menu.url;
    if (url) {
      router.push(url).catch((e) => e);
    }
  };

  // 新增tab
  const addTab = (tab: MaskTab) => {
    const match = tabs.value.find((n) => isEqual(n, tab));
    if (match) {
      activeTab(match);
    } else {
      tabs.value = [tab, ...tabs.value].splice(0, props.tabs || 0);
      activeTab(tab);
    }
  };

  // 下拉菜单的tab 移动到 banner 并激活
  const moveToShow = (tab: MaskTab) => {
    const items = tabs.value.filter((n) => !isEqual(n, tab));
    tabs.value = [tab, ...items];
    activeTab(tab);
  };

  // 删除tab
  const removeTab = async (tab: MaskTab) => {
    const ret = await ElMessageBox.confirm('是否关闭页签', '提示', {
      type: 'warning'
    }).catch((e) => false);
    if (!ret) return;
    tabs.value = tabs.value.filter((n) => !isEqual(n, tab));
    // 删除的是激活tab
    if (active.value?.id === tab.menu.id) {
      const first = tabs.value[0];
      first ? activeTab(first) : activeHome();
    }
  };

  // 删除全部tabs
  const removeAllTabs = async () => {
    const ret = await ElMessageBox.confirm('是否关闭全部页签', '提示', {
      type: 'warning'
    }).catch((e) => false);
    if (!ret) return;
    tabs.value = [];
    activeHome();
  };

  // 删除其他tabs
  const removeOtherTabs = async () => {
    const ret = await ElMessageBox.confirm('是否关闭其他页签', '提示', {
      type: 'warning'
    }).catch((e) => false);
    if (!ret) return;
    tabs.value = tabs.value.filter((n) => n.menu.id === active.value?.id);
  };

  // const openTab = (to: RouteLocationRaw, menu: MenuDataItem) => {
  //   const tab: MaskTab = {
  //     menu: { ...menu, id: Date.now() },
  //     closable: true
  //   };
  //   router.push(to);
  //   // addTab(tab);
  // };

  return {
    tabRef,
    homeTab,
    tabs,
    showTabs,
    dropdownTabs,
    tabsValue,
    isActiveTab,
    addTab,
    removeTab,
    moveToShow,
    activeHome,
    activeTab,
    removeAllTabs,
    removeOtherTabs
    // openTab
  };
}
