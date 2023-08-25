<template>
  <XContainer class="x-mask">
    <Sidebar></Sidebar>
    <XContainer class="x-mask__main" grow flex direction="column">
      <Topbar></Topbar>
      <XContainer class="x-mask__content" :flex="false" grow padding>
        <KeepAlive>
          <Suspense>
            <RouterView></RouterView>
          </Suspense>
        </KeepAlive>
      </XContainer>
    </XContainer>
  </XContainer>
</template>
<script lang="ts" setup>
  import { provide, getCurrentInstance, KeepAlive, Suspense } from 'vue';
  import { RouterView } from 'vue-router';
  import { XContainer } from '../';
  import Sidebar from './Sidebar.vue';
  import Topbar from './Topbar.vue';
  import { maskProps } from './types';
  const props = defineProps(maskProps);
  const instance = getCurrentInstance();
  provide('$mask', instance);
  console.log('instance', instance);
  defineOptions({
    name: 'XMask'
  });
</script>
