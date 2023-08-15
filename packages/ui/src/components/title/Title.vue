<template>
  <XContainer
    class="x-title"
    justify="space-between"
    align="center"
    :class="classes">
    <XContainer align="center" class="x-title__wrapper" :class="classes">
      <component v-if="icon" :is="icon" class="x-title__icon"></component>
      <span class="x-title__content" v-bind="$attrs">
        <slot>{{ props.content }}</slot>
      </span>
      <XIcon v-if="props.more" class="x-title__more" :icon="ArrowRight"></XIcon>
      <span v-if="props.subtitle || $slots.subtitle" class="x-title__subtitle">
        <slot name="subtitle"> {{ props.subtitle }} </slot>
      </span>
    </XContainer>
    <div v-if="$slots.actions" class="x-title__actions">
      <slot name="actions"></slot>
    </div>
  </XContainer>
</template>
<script lang="ts" setup>
  import { toRef, useAttrs, computed } from 'vue';
  import { XContainer, XIcon } from '../../';
  import { useIcon } from '../../hooks';
  import { titleProps } from './types';
  import { ArrowRight } from '@element-plus/icons-vue';

  defineOptions({
    name: 'XTitle',
    inheritAttrs: false
  });

  const props = defineProps(titleProps);
  const attrs = useAttrs();
  const icon = useIcon(toRef(props, 'icon'));

  const classes = computed(() => {
    return {
      [`is-size-${props.size}`]: !!props.size && props.size !== 'default',
      'is-border': props.border,
      'is-pointer': !!attrs.onClick
    };
  });
</script>
