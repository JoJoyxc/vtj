// import { createApp } from 'vue';
import { createProvider, StorageService } from '@vtj/renderer';

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

onReady(() => {
  console.log('ready', provider);
});

console.log(provider.project);

// const app = createApp(Designer);
// app.mount('#app');
