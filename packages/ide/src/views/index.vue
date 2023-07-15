<template>
  <div ref="container" class="container"></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  Engine,
  EVENT_ACTION_PREVIEW,
  PageSchema,
  SummarySchema,
  FileService,
  StorageService
} from '@vtj/engine';
import { useProvider, isPage } from '@vtj/runtime';
const provider = useProvider();
const container = ref<HTMLElement | undefined>();
const {
  id = 'ide',
  name = 'IDE',
  base = '/',
  mode = 'hash',
  page = '/page',
  preview = '/preview',
  home = '/'
} = provider?.options.project || {};

const service = provider?.options.service;
const engine = new Engine(container, {
  service: service === 'file' ? new FileService() : new StorageService(),
  config: {
    widgets: [
      {
        name: 'switcher',
        props: {
          link: `/#${home}`
        }
      }
    ]
  },
  project: {
    id,
    name
  },
  globals: {
    $route: useRoute(),
    $router: useRouter(),
    $provider: provider
  }
});

engine.emitter.on(EVENT_ACTION_PREVIEW, (file: PageSchema | SummarySchema) => {
  const split = mode === 'hash' ? '#' : '';
  // const pathname = location.pathname;
  const url = isPage(file)
    ? `${base}${split}${page}/${file.id}`
    : `${base}${split}${preview}/${(file as SummarySchema).id}`;
  window.open(url);
});

// console.log('[engine]', engine);
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
}
</style>
