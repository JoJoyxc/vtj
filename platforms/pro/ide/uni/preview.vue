<template>
  <div class="uni-app-previewer">
    <iframe ref="iframeRef"></iframe>
  </div>
</template>
<script lang="ts" setup>
  import { ref, getCurrentInstance, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { initUniSandbox } from '@vtj/uni';
  import {
    createProvider,
    LocalService,
    ContextMode,
    Extension,
    Access,
    createAdapter,
    createServiceRequest
  } from '../../src';
  import { ACCESS_STORAGE_KEY } from '../contants';
  import { ElMessageBox } from 'element-plus';
  import { notify, loading } from '../utils';
  const adapter = createAdapter({ loading, notify });
  const service = new LocalService(createServiceRequest(notify));
  const config = await service.getExtension().catch(() => null);
  const { options, adapters } = config
    ? await new Extension(config).load()
    : {};

  const { __BASE_PATH__ = '/' } = config || {};
  const accessOptions = adapters?.access;
  const remote = adapters?.remote;
  const access = accessOptions
    ? new Access({
        alert: ElMessageBox.alert,
        storageKey: ACCESS_STORAGE_KEY,
        ...accessOptions
      })
    : undefined;
  const { provider, onReady } = createProvider({
    mode: ContextMode.Design,
    project: {},
    service,
    materialPath: __BASE_PATH__,
    ...(options || {}),
    adapter: Object.assign(adapter, { access, remote }, options?.adapter || {}),
    dependencies: {
      // Vue: () => import('vue'),
      // VueRouter: () => import('vue-router')
    }
  });
  const iframeRef = ref();
  const route = useRoute();
  const instance = getCurrentInstance();
  console.log(options, adapters, route);
  onReady(async () => {
    const app = instance?.appContext.app;
    if (app) {
      app.use(provider);
    }
  });

  onMounted(() => {
    initUniSandbox(iframeRef.value, {} as any, (env: any) => {
      alert('ready');
      console.log(env);
    });
  });
</script>

<style lang="scss" scoped>
  .uni-app-previewer {
    width: 100%;
    height: 100vh;
    > iframe {
      width: 100%;
      height: 100%;
      padding: 0;
      border: 0;
    }
  }
</style>
