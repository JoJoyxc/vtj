<template>
  <XMask
    :menus="menus"
    :favorites="favorites"
    manual-menu
    @menu-select="onMenuSelect"
    :defaultActiveMenu="defaultActiveMenu"
    :home="{ url: '/ui/mask' }"
    :maxTabs="20"
    :actions="actions"
    theme-switch
    @action-click="onActionClick">
  </XMask>
</template>
<script lang="ts" setup>
  import { reactive, markRaw } from 'vue';
  import { useRouter, RouteLocationNormalizedLoaded } from 'vue-router';
  import { XMask, MenuDataItem, ActionBarItems } from '@vtj/ui';
  import { request } from '@vtj/utils';
  import {
    MoreFilled,
    Lock,
    SwitchButton,
    Bell,
    QuestionFilled,
    Close
  } from '@element-plus/icons-vue';

  const router = useRouter();

  const menus = async () => {
    return await request({
      url: '/mock/menus.json'
    }).then((res) => res.data);
  };

  const favorites = async () => {
    return await request({
      url: '/mock/favorites.json'
    }).then((res) => res.data);
  };

  const onMenuSelect = (menu: MenuDataItem) => {
    router.push({
      path: '/ui/mask/page',
      query: { id: menu.id }
    });
  };

  const defaultActiveMenu = (
    to: RouteLocationNormalizedLoaded,
    menus: MenuDataItem[] = []
  ) => {
    return menus.find((n) => n.id.toString() === to.query.id);
  };

  const actions: ActionBarItems = reactive([
    {
      icon: markRaw(Bell),
      badge: 0
    },
    {
      icon: markRaw(QuestionFilled)
    },
    {
      icon: markRaw(Lock)
    },
    {
      icon: markRaw(SwitchButton)
    }
  ]);

  setTimeout(() => {
    (actions[0] as any).badge = 100;
  }, 3000);

  const onActionClick = (action: any) => {
    console.log('onActionClick', action);
  };
</script>
