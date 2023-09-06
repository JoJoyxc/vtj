<template>
  <XContainer class="x-mask__content" :flex="false" grow padding>
    <slot></slot>

    <RouterView v-slot="{ Component, route }">
      <KeepAlive ref="aliveRef">
        <component v-if="aliveKey" :is="Component" :key="route.fullPath" />
      </KeepAlive>
    </RouterView>
  </XContainer>
</template>
<script lang="ts" setup>
  import { KeepAlive } from 'vue';
  import { RouterView } from 'vue-router';
  import { XContainer } from '../../';
  import { useViewCache } from '../use';

  const { aliveKey, aliveRef, refresh, getCacheComponent } = useViewCache();

  defineExpose({
    getCacheComponent,
    refresh
  });
</script>
