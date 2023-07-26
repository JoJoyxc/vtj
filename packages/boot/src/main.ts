import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createProvider } from '@vtj/runtime';
import '@vtj/icons/lib/style.css';
import '@vtj/ui/lib/style.css';
import '@/style/index.scss';
const modules = import.meta.glob([
  '/.vtj/project/*.json',
  '/.vtj/file/*.json',
  '/src/views/pages/*.vue'
]);
const app = createApp(App);

(async () => {
  const provider = await createProvider({
    app,
    modules,
    router,
    startup: true
  });
  app.use(router);
  app.use(provider);
  app.mount('#app');
})();
