<template>
  <XContainer class="x-mask">
    <Sidebar
      :logo="props.logo"
      :title="props.title"
      @menu-select="selectMenu"></Sidebar>
    <XContainer class="x-mask__main" grow flex direction="column">
      <Topbar
        @tab-remove="removeTab"
        @tab-click="onTabClick"
        @home-click="onHomeClick">
        <slot name="user"></slot>
      </Topbar>
      <XContainer class="x-mask__content" :flex="false" grow padding>
        <slot v-if="$slots.default"></slot>
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
  import {
    provide,
    KeepAlive,
    Suspense,
    getCurrentInstance,
    ComponentInternalInstance
  } from 'vue';
  import { RouterView } from 'vue-router';
  import { XContainer } from '../';
  import Sidebar from './Sidebar.vue';
  import Topbar from './Topbar.vue';
  import {
    maskProps,
    MASK_INSTANCE_KEY,
    MASK_STATE_KEY,
    MaskEmits
  } from './types';
  import { useState, useMethods } from './hooks';
  const props = defineProps(maskProps);
  const emit = defineEmits<MaskEmits>();
  const state = useState(props);
  const { selectMenu, removeTab, onTabClick, onHomeClick } = useMethods(
    props,
    state,
    emit
  );
  const instance = getCurrentInstance();

  provide(MASK_STATE_KEY, state);
  provide(MASK_INSTANCE_KEY, instance as ComponentInternalInstance);

  defineOptions({
    name: 'XMask'
  });

  defineExpose({
    state,
    selectMenu
  });
</script>
