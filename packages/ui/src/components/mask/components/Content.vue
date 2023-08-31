<template>
  <XContainer class="x-mask__content" :flex="false" grow padding>
    <slot></slot>
    <KeepAlive>
      <Suspense>
        <RouterView></RouterView>
      </Suspense>
    </KeepAlive>
  </XContainer>
</template>
<script lang="ts" setup>
  import { KeepAlive, Suspense } from 'vue';
  import { XContainer } from '../../';
  import { RouterView } from 'vue-router';
</script>
