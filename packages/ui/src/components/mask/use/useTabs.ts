import { shallowRef, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { MaskProps, MaskEmits, TAB_ITEM_WIDTH, MaskTab } from '../types';
import { Emits } from '../../';
import { useElementSize } from '@vueuse/core';
import { ElMessageBox } from 'element-plus';
import { HomeFilled } from '@element-plus/icons-vue';

export function useTabs(props: MaskProps, emit: Emits<MaskEmits>) {
  const route = useRoute();
  const router = useRouter();
  const homeTab = computed<MaskTab>(() => {
    return typeof props.home === 'string'
      ? {
          url: props.home,
          icon: HomeFilled,
          closable: false
        }
      : ({
          ...props.home,
          closable: false
        } as MaskTab);
  });
  // tabs 组件引用
  const tabRef = ref();
  const { width } = useElementSize(tabRef);
  // tabs数据项
  const tabs = shallowRef<MaskTab[]>([]);

  // 当前激活的Tab name
  const currentTabValue = ref<string | undefined>();

  // baner上可以展示的tab数量
  const showCount = computed(() => Math.floor(width.value / TAB_ITEM_WIDTH));
  // banner 上的tabs项
  const showTabs = computed(() => tabs.value.slice(0, showCount.value));
  // 放在下拉菜单的tabs项
  const dropdownTabs = computed(() => tabs.value.slice(showCount.value));

  // 判断是否激活的tab
  const isActiveTab = (tab: MaskTab) => {
    return route.fullPath === tab.url;
  };

  // 判断两个tab项是否相等
  const isEqual = (a: MaskTab, b: MaskTab) => {
    return a === b || a.url === b.url;
  };

  const isExistTab = (url: string) => {
    return !!tabs.value.find((n) => n.url === url);
  };

  const isHomeTab = (url: string) => {
    return homeTab.value.url === url;
  };

  // 切换tab
  const activeTab = (tab: MaskTab) => {
    currentTabValue.value = tab.url;
    router.push(currentTabValue.value).catch((e) => e);
  };

  // 切换到首页
  const activeHome = () => {
    currentTabValue.value = homeTab.value.url;
    router.push(currentTabValue.value).catch((e) => e);
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

  const updateTab = (tab: MaskTab) => {
    const index = tabs.value.findIndex((n) => isEqual(n, tab));

    if (index >= 0) {
      const match = tabs.value[index];
      tabs.value = [...tabs.value].splice(
        index,
        1,
        Object.assign(match, tab, { id: Symbol() })
      );
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

    if (currentTabValue.value === tab.url) {
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
    tabs.value = tabs.value.filter((n) => n.url === currentTabValue.value);
  };

  return {
    tabRef,
    homeTab,
    tabs,
    showTabs,
    dropdownTabs,
    currentTabValue,
    isActiveTab,
    addTab,
    removeTab,
    moveToShow,
    activeHome,
    activeTab,
    removeAllTabs,
    removeOtherTabs,
    updateTab,
    isExistTab,
    isHomeTab
    // openTab
  };
}
