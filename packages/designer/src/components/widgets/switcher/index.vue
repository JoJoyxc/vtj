<template>
  <div class="v-switcher-widget">
    <ElButton size="small" round @click="onClick">
      <VtjIconBack class="v-switcher-widget__back"></VtjIconBack>
      <span>{{ title }}</span>
      <ElDivider v-if="subtitle" direction="vertical"></ElDivider>
      <span v-if="subtitle">{{ subtitle }}</span>
    </ElButton>
  </div>
</template>
<script lang="ts" setup>
  import { ElButton, ElDivider } from 'element-plus';
  import { VtjIconBack } from '@vtj/icons';

  export interface Props {
    title?: string;
    subtitle?: string;
    link?: string;
    router?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    title: '项目名称',
    subtitle: '系统管理',
    link: ''
  });

  const emit = defineEmits(['click']);

  const onClick = () => {
    if (props.link) {
      location.href = props.link;
    }
    emit('click');
  };

  defineOptions({
    name: 'SwitcherWidget',
    inheritAttrs: false
  });
</script>
