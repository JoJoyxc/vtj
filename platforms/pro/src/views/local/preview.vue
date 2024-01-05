<template>
  <component v-if="renderer" :is="renderer"></component>
</template>
<script lang="ts" setup>
  import { ref, getCurrentInstance } from 'vue';
  import { useRoute } from 'vue-router';
  import { createProvider, RemoteService } from '@/lcdp';
  const service = new RemoteService();

  const { provider, onReady } = createProvider({
    service,
    project: {
      id: 'demo'
    },
    dependencies: {
      Vue: () => import('vue'),
      VueRouter: () => import('vue-router'),
      ElementPlus: () => import('element-plus')
    }
  });
  const route = useRoute();
  const renderer = ref();
  const instance = getCurrentInstance();

  onReady(async () => {
    instance?.appContext.app.use(provider);
    renderer.value = await provider.getRenderComponent(
      route.params.id.toString()
    );
  });
</script>
