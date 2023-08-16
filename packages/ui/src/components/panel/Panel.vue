<template>
  <XContainer
    class="x-panel"
    direction="column"
    :class="classes"
    :fit="props.fit"
    :width="props.width"
    :height="props.height">
    <XContainer v-if="headerProps" :flex="false" class="x-panel__header">
      <slot name="header">
        <XHeader v-bind="headerProps">
          <template #actions>
            <slot name="actions"></slot>
          </template>
        </XHeader>
      </slot>
    </XContainer>
    <XContainer grow class="x-panel__body" :class="bodyClasses">
      <slot></slot>
    </XContainer>
    <XContainer
      v-if="$slots.footer"
      class="x-panel__footer"
      :class="footerClasses">
      <slot name="footer"></slot>
    </XContainer>
  </XContainer>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { XContainer, XHeader } from '../../';
  import { panelProps } from './types';
  const props = defineProps(panelProps);

  const classes = computed(() => {
    return {
      'x-panel--card': !!props.card,
      'x-panel--default': !props.card,
      [`is-${props.size}`]: !!props.size && props.size !== 'default',
      'is-border': !!props.border,
      'is-radius': !!props.radius,
      [`is-shadow-${props.shadow}`]: !!props.shadow && props.shadow !== 'none'
    };
  });

  const headerProps = computed(() => {
    if (!props.header === null) return null;
    return typeof props.header === 'string'
      ? {
          content: props.header,
          size: props.size
        }
      : {
          ...props.header,
          size: props.size
        };
  });

  const bodyClasses = computed(() => {
    return {
      'is-padding': !!props.bodyPadding
    };
  });

  const footerClasses = computed(() => {
    return {
      'is-padding': !!props.footerPadding
    };
  });
</script>
