<template>
  <div ref="uniRef">UniApp</div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { setupUniApp } from '@vtj/uni';
  import UniRoot from '../components/UniRoot.vue';
  import UniPage from '../components/UniPage.vue';

  const uniRef = ref();
  const app = setupUniApp({
    App: UniRoot,
    routes: [
      {
        path: '/',
        // component: () => import('@/components/UniPage.vue')
        component: UniPage
      }
    ]
  });

  onMounted(() => {
    app.mount(uniRef.value);
  });
  console.log('uniapp', app);
</script>
