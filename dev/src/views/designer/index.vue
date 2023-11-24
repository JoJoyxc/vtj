<template>
  <div class="designer" ref="container"></div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Engine, widgetManager } from '@vtj/designer';

  import logo from '@/assets/logo.png';

  widgetManager.set('Logo', {
    props: {
      icon: logo
    }
  });

  const container = ref();
  const engine = new Engine(container);
  console.log('engine', engine);
</script>
<style lang="scss" scoped>
  .designer {
    width: 100%;
    height: 100%;
    border: 1px solid var(--el-border-color);
  }
</style>
