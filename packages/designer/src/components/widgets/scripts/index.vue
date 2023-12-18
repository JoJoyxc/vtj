<template>
  <XContainer class="v-scripts-widget" direction="column" fit>
    <State title="状态数据"></State>
    <!-- <Group title="计算属性"></Group>
    <Group title="组件方法"></Group>
    <Group title="生命周期"></Group>
    <Group title="监听器"></Group> -->
  </XContainer>
</template>

<script lang="ts" setup>
  import { XContainer } from '@vtj/ui';
  import State from './state.vue';
</script>
