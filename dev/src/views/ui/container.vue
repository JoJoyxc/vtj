<template>
  <XContainer class="box" fit direction="column">
    <XContainer class="inner" height="50px">header</XContainer>
    <XContainer class="inner" grow :flex="false">
      <div v-for="n in 100">1</div>
    </XContainer>
    <XContainer height="40px">footer</XContainer>
  </XContainer>
</template>

<script lang="ts" setup>
  import { XContainer } from '@vtj/ui';
</script>

<style lang="scss" scoped>
  .box {
    border: 1px solid #999;
  }
  .inner {
    background-color: #ddd;
  }
</style>
