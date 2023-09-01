<template>
  <XContainer class="x-mask__content" :flex="false" grow padding>
    <slot></slot>
    <KeepAlive :key="aliveKey">
      <Suspense>
        <RouterView :key="viewKey"></RouterView>
      </Suspense>
    </KeepAlive>
  </XContainer>
</template>
<script lang="ts" setup>
  import { KeepAlive, Suspense, computed, ref } from 'vue';
  import { XContainer } from '../../';
  import { RouterView, useRoute } from 'vue-router';
  const route = useRoute();
  const viewKey = computed(() => route.fullPath);

  const aliveKey = ref(Symbol());

  const refresh = () => {
    aliveKey.value = Symbol();
  };

  defineExpose({
    refresh
  });
</script>
