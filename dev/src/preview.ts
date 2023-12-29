import { createApp } from 'vue';
import { createProvider, StorageService } from '@vtj/pro';
const service = new StorageService();

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

onReady(async () => {
  const renderer = await provider.getRenderComponent('la9cvg19w8');
  if (renderer) {
    const app = createApp(renderer);
    app.use(provider);
    app.mount('#app');
  }
});
