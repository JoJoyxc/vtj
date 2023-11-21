<template>
  <div class="designer" ref="container"></div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Engine } from '@vtj/designer';
  const container = ref();
  const engine = new Engine(container);

  console.log('engine', engine);
  setTimeout(() => {
    const brand = engine.skeleton?.getRegion('Brand');
    console.log('brandWrapper', brand);
    const logo = engine.skeleton?.getWidget('Logo');
    console.log('logo', logo);
    // engine.skeleton?.toggleCollapse();
    // engine.skeleton?.settable(false);
  }, 1000);
</script>
<style lang="scss" scoped>
  .designer {
    width: 100%;
    height: 100%;
    border: 1px solid var(--el-border-color);
  }
</style>
