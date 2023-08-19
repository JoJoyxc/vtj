<template>
  <Teleport v-if="props.modelValue" to="body">
    <div ref="wrapper" class="x-dialog__wrapper" :class="wrapperClass">
      <div v-if="props.modal" class="x-dialog__modal"></div>
      <XPanel
        class="x-dialog"
        card
        shadow="always"
        :header="{ icon: props.icon, subtitle: props.subtitle }"
        width="800px"
        height="600px"
        :footer="{ justify: 'space-between', flex: true, align: 'center' }"
        :class="classes"
        :style="styles"
        v-draggable="draggable">
        <template #title>{{ props.title }}</template>
        <template #actions>
          <slot name="actions"></slot>
          <XAction
            v-if="props.minimizable"
            :icon="Minimize"
            size="small"
            mode="icon"
            type="primary"
            background="hover"
            @click="changeMode('minimized')"></XAction>
          <template v-if="props.maximizable">
            <XAction
              v-if="!normal"
              :icon="Popup"
              size="small"
              mode="icon"
              type="primary"
              background="hover"
              @click="changeMode('normal')"></XAction>
            <XAction
              v-else
              :icon="Maximize"
              size="small"
              mode="icon"
              type="primary"
              background="hover"
              @click="changeMode('maximized')"></XAction>
          </template>
          <XAction
            v-if="props.closable"
            :icon="RawClose"
            size="small"
            mode="icon"
            type="danger"
            background="hover"
            @click="close"></XAction>
        </template>
        <slot></slot>
        <template #footer>
          <slot name="footer">
            <XContainer>
              <slot name="extra"></slot>
            </XContainer>
            <XContainer>
              <slot name="handle"></slot>
              <ElButton type="default" size="default">取消</ElButton>
              <ElButton type="primary" size="default">确定</ElButton>
            </XContainer>
          </slot>
        </template>
      </XPanel>
    </div>
  </Teleport>
</template>
<script lang="ts" setup>
  import { Teleport, ref, watchEffect } from 'vue';
  import { RawClose, Popup, Maximize, Minimize } from '@vtj/icons';
  import { ElButton } from 'element-plus';
  import { XPanel, XAction, XContainer } from '../';
  import { vDraggable } from '../../directives';
  import { dialogProps, DialogEmits } from './types';
  import { useState, useStyle, useMethods, useDraggableOptions } from './hooks';

  defineOptions({
    name: 'XDialog'
  });

  const props = defineProps(dialogProps);
  const emit = defineEmits<DialogEmits>();
  const wrapper = ref();
  const { state, maximized, minimized, normal } = useState(props, wrapper);
  const { styles, classes, wrapperClass } = useStyle(props, state);
  const { changeMode, active, close, show, hide } = useMethods(
    props,
    state,
    emit
  );
  const draggable = useDraggableOptions(props, state, emit, wrapper);

  watchEffect(() => {
    if (props.modelValue) {
      emit('open');
    }
  });

  defineExpose({
    state,
    maximized,
    minimized,
    changeMode,
    show,
    hide
  });
</script>
