<template>
  <XContainer class="x-mask__content" :flex="false" grow padding>
    <slot></slot>

    <RouterView v-slot="{ Component, route }">
      <KeepAlive :exclude="aliveExclude">
        <component
          v-if="aliveKey && props.tab && props.tab.url === route.fullPath"
          :key="route.fullPath"
          :is="loader.createVNode(Component, route)"></component>
      </KeepAlive>
    </RouterView>
  </XContainer>
</template>
<script lang="ts" setup>
  import { KeepAlive, watch } from 'vue';
  import { RouterView } from 'vue-router';
  import { XContainer } from '../../';
  import { useMask } from '../MaskFactory';
  import { MaskTab } from '../types';

  export interface Props {
    tab?: MaskTab;
  }

  const props = defineProps<Props>();
  const mask = useMask();
  const { aliveKey, aliveExclude, loader } = mask;
</script>
