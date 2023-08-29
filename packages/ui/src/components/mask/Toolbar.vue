<template>
  <XContainer class="x-mask-toolbar" align="center">
    <XAction
      :icon="MoreFilled"
      :menus="tabs"
      :dropdown="{ size: 'small' }"
      mode="icon"
      circle
      background="hover"
      @command="onTabCommand">
      <template #item="{ item }">
        <span class="x-mask-toolbar__menu-item">
          {{ item.label }}
          <XIcon
            v-if="!['other', 'all'].includes(item.command)"
            @click.stop="onCloseItem(item)"
            :icon="Close"></XIcon>
        </span>
      </template>
    </XAction>

    <ElDivider direction="vertical"></ElDivider>
    <XActionBar
      v-if="actions"
      circle
      mode="icon"
      size="default"
      background="hover"
      :items="actions"
      @click="onActionClick"></XActionBar>
    <ElDivider v-if="actions" direction="vertical"></ElDivider>

    <ThemeSwitch v-if="mask.props.themeSwitch"></ThemeSwitch>
    <ElDivider v-if="mask.props.themeSwitch" direction="vertical"></ElDivider>
    <Avatar></Avatar>
  </XContainer>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import {
    XContainer,
    XAction,
    ActionMenuItem,
    XIcon,
    MenuDataItem,
    XActionBar,
    ActionBarItems,
    ActionProps
  } from '../';
  import { MoreFilled, Close } from '@element-plus/icons-vue';
  import { ElDivider, ElAvatar } from 'element-plus';
  import Avatar from './Avatar.vue';
  import ThemeSwitch from './ThemeSwitch.vue';

  export interface Props {
    tabs: MenuDataItem[];
  }

  const props = withDefaults(defineProps<Props>(), { tabs: () => [] });
  import { useInjectMask } from './hooks';
  const emit = defineEmits([
    'closeOtherTabs',
    'closeAllTabs',
    'closeTab',
    'clickTab'
  ]);
  const mask = useInjectMask();
  const actions = computed(() => mask.props.actions as ActionBarItems);

  const tabs = computed(() => {
    const menus = props.tabs.map((n, i) => {
      return {
        divided: i === 0,
        label: n.title,
        command: n
      };
    });
    return [
      {
        label: '关闭其他',
        command: 'other'
      },
      {
        label: '关闭全部',
        command: 'all'
      },
      ...menus
    ];
  });

  const onCloseItem = (item: ActionMenuItem) => {
    emit('closeTab', item.command);
  };

  const onTabCommand = (item: ActionMenuItem) => {
    switch (item.command) {
      case 'all':
        emit('closeAllTabs');
        break;
      case 'other':
        emit('closeOtherTabs');
        break;
      default:
        emit('clickTab', item.command);
        break;
    }
  };

  const onActionClick = (action: ActionProps) => {
    mask.emit('actionClick', action);
  };

  const onActionCommand = (action: ActionProps, item: ActionMenuItem) => {
    mask.emit('actionCommand', action, item);
  };
</script>
