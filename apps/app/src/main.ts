import { createApp } from 'vue';
import { createProvider, LocalService, modules } from '@vtj/web';
import router from './router';
import App from './App.vue';
import './style/index.scss';

const app = createApp(App);
const service = new LocalService();
const { provider, onReady } = createProvider({
  service,
  modules,
  router,
  dependencies: {
    Vue: () => import('vue'),
    VueRouter: () => import('vue-router'),
    ElementPlus: () => import('element-plus')
  }
});

onReady(async () => {
  app.use(router);
  app.use(provider);
  app.mount('#app');
});
