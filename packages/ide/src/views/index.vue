<template>
  <div ref="container" class="container"></div>
</template>

<script lang="ts" setup>
  import { ref, Ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import {
    Engine,
    EVENT_ACTION_PREVIEW,
    EVENT_ACTION_HOME,
    EVENT_ACTION_CODER,
    PageSchema,
    SummarySchema,
    FileService,
    StorageService,
    BlockSchema,
    ProjectSchema
  } from '@vtj/engine';
  import { useProvider, isPage } from '@vtj/runtime';
  import { ElMessage, ElNotification } from 'element-plus';
  import { ideBase } from '@/api';
  const container = ref<HTMLElement | undefined>();
  const provider = useProvider();
  const { project, options } = provider || {};
  const {
    id = 'ide',
    name = 'IDE',
    base = '/',
    mode = 'hash',
    page = '/page',
    preview = '/preview',
    home = '/'
  } = project || {};

  const service = options?.service;

  const engine = new Engine(container, {
    service: service === 'file' ? new FileService() : new StorageService(),
    config: {
      widgets: [
        {
          name: 'switcher',
          props: {
            link: `/#${home}`
          }
        },
        {
          name: 'actions',
          props: {
            coder: !!options?.raw
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

  engine.emitter.on(
    EVENT_ACTION_PREVIEW,
    (file: PageSchema | SummarySchema) => {
      const raw = provider?.options.raw;
      const split = mode === 'hash' ? '#' : '';
      let url = '';
      if (isPage(file)) {
        url = raw
          ? `${base}${split}${preview}/${(file as SummarySchema).id}`
          : `${base}${split}${page}/${(file as SummarySchema).id}`;
      } else {
        url = `${base}${split}${preview}/${(file as SummarySchema).id}`;
      }

      window.open(url);
    }
  );

  engine.emitter.on(EVENT_ACTION_HOME, (file: PageSchema) => {
    const split = mode === 'hash' ? '#' : '';
    const url = `${base}${split}${home}`;
    window.open(url);
  });

  engine.emitter.on(EVENT_ACTION_CODER, async (loading: Ref<boolean>) => {
    loading.value = true;
    const dsl = engine.project.toDsl();
    const componentMap = engine.assets.componentMap;

    ideBase({
      type: 'projectCoder',
      data: {
        project: dsl,
        assets: {
          componentMap
        }
      }
    })
      .then((res) => {
        ElMessage.success({
          message: '出码完成'
        });
        return res;
      })
      .finally(() => {
        loading.value = false;
      });
  });

  // console.log('[engine]', engine);
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;
    width: 100%;
  }
</style>
