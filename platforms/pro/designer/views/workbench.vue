<template>
  <div class="designer" ref="container"></div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  import {
    Engine,
    widgetManager,
    StorageService,
    type PageFile,
    type BlockFile
  } from '../../src';

  const container = ref();
  const router = useRouter();

  widgetManager.set('Switcher', {
    props: {
      onClick: (project: any) => {
        console.log('Switcher clicked', project);
      }
    }
  });

  widgetManager.set('Actions', {
    props: {
      onPreview: (type: 'current' | 'home', file: PageFile | BlockFile) => {
        console.log('Actions preview', type, file);
        router.push({
          name: 'preview',
          params: {
            id: file.id
          }
        });
      }
    }
  });

  new Engine({
    container,
    service: new StorageService(),
    project: {
      id: 'demo',
      name: 'dev-project'
    }
  });
</script>
<style lang="scss" scoped>
  .designer {
    width: 100%;
    height: 100%;
  }
</style>
