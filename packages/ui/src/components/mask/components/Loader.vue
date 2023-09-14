<template>
  <Teleport :to="to" :disabled="!props.tab?.dialog">
    <component :is="props.component"></component>
  </Teleport>
  <XDialog
    v-if="visible && props.tab && props.tab.dialog"
    ref="dialog"
    resizable
    :icon="props.tab.icon"
    :title="props.tab.title"
    :modal="false"
    width="80%"
    height="80%"
    @minimized="onMinimized"
    @close="onClose">
  </XDialog>
</template>
<script lang="ts"></script>
<script lang="ts" setup>
  import { Teleport, ref, computed, watch } from 'vue';
  import { XDialog } from '../../';
  import { MaskTab } from '../types';

  export interface Props {
    tab: MaskTab;
    component: any;
  }

  const props = defineProps<Props>();
  const emit = defineEmits(['minimized', 'close']);

  const dialog = ref();
  const to = computed(() => {
    return dialog.value?.panelRef.bodyRef.$el || 'body';
  });

  const visible = ref(true);

  const onMinimized = () => {
    visible.value = false;
    emit('minimized', props.tab);
  };

  watch(
    () => props.tab,
    () => {
      console.log('loader tab', props.tab);
      visible.value = true;
    }
  );

  const onClose = () => {
    visible.value = false;
    emit('close', props.tab);
  };
</script>
