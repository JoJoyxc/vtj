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
  import { VtjIconPlus, Back } from '@vtj/icons';

  export interface Props {
    title?: string;
    subtitle?: string;
    plus?: boolean;
    back?: boolean;
  }

  const props = defineProps<Props>();
  const emit = defineEmits(['plus', 'back']);

  const onClickPlus = () => {
    emit('plus');
  };

  const onClickBack = () => {
    emit('back');
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
