<template>
  <ElButton
    v-if="props.mode === 'button'"
    :icon="icon"
    :type="props.type"
    :size="props.size"
    :disabled="props.disabled"
    v-bind="props.button"
    @click="onClick">
    {{ label }}
  </ElButton>
  <div v-else class="x-action__inner" :class="innerClass" @click="onClick">
    <component :is="icon"></component>
    <span v-if="label">{{ label }}</span>
  </div>
</template>

<script lang="ts" setup>
  import { computed, toRef } from 'vue';
  import { ElButton } from 'element-plus';
  import { actionProps } from './types';
  import { useIcon } from '../../hooks';

  const props = defineProps(actionProps);
  const emit = defineEmits(['click']);
  const icon = useIcon(toRef(props, 'icon'));

  const innerClass = computed(() => {
    return {
      [`x-action--${props.mode}`]: !!props.mode,
      [`is-${props.type}`]: !!props.type,
      [`x-action--${props.size}`]: !!props.size,
      [`is-background-${props.background}`]:
        props.mode === 'icon' && !!props.background,
      'is-disabled': !!props.disabled,
      'is-circle': !!props.circle
    };
  });

  const onClick = () => {
    emit('click');
  };
</script>
