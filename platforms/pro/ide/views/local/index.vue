<template>
  <div class="designer" ref="container"></div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Engine, widgetManager, RemoteService } from '../../../src';

  const container = ref();

  widgetManager.set('Switcher', {
    props: {
      onClick: (_project: any) => {
        const pathname = location.pathname;
        const url = pathname === '/@vtj/pro/' ? '/' : pathname;
        window.open(url, 'VTJProject');
      }
    }
  });

  widgetManager.set('Previewer', {
    props: {
      path: (block: any) => {
        const pathname = location.pathname;
        return `${pathname}#/local/preview/${block.id}`;
      }
    }
  });

  new Engine({
    container,
    service: new RemoteService()
  });
</script>
<style lang="scss" scoped>
  .designer {
    width: 100%;
    height: 100%;
  }
</style>
