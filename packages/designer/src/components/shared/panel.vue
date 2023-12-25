<template>
  <XPanel class="v-panel" :border="false" :header="header" fit>
    <template #actions>
      <XAction
        v-if="props.plus"
        :size="($attrs.size as any)"
        mode="icon"
        :icon="VtjIconPlus"
        background="hover"
        title="新增"
        @click="onClickPlus"></XAction>
      <XAction
        v-if="props.remove"
        :size="($attrs.size as any)"
        mode="icon"
        :icon="DeleteFilled"
        background="hover"
        title="清空历史记录"
        @click="onClickRemove"></XAction>
      <slot name="actions"></slot>
    </template>
    <slot></slot>
    <template #footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>
  </XPanel>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { XPanel, XAction } from '@vtj/ui';
  import { VtjIconPlus, Back, DeleteFilled } from '@vtj/icons';

  export interface Props {
    title?: string;
    subtitle?: string;
    plus?: boolean;
    back?: boolean;
    remove?: boolean;
  }

  const props = defineProps<Props>();
  const emit = defineEmits(['plus', 'back', 'remove']);

  const onClickPlus = () => {
    emit('plus');
  };

  const onClickBack = () => {
    emit('back');
  };

  const onClickRemove = () => {
    emit('remove');
  };

  const header = computed(() => {
    return {
      content: props.title,
      subtitle: props.subtitle,
      icon: props.back ? Back : undefined,
      onClickBack: props.back ? onClickBack : undefined
    };
  });

  defineOptions({
    name: 'VPanel'
  });
</script>
