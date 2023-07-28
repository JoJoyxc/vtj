import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createProvider } from '@vtj/runtime';
import Mask from '@/components/Mask.vue';
import '@vtj/icons/lib/style.css';
import '@vtj/ui/lib/style.css';
import '@/style/index.scss';
const modules = import.meta.glob([
  '/.vtj/project/*.json',
  '/.vtj/file/*.json',
  '/src/views/pages/*.vue',
  '/src/components/blocks/*.vue'
]);
const app = createApp(App);

(async () => {
  await createProvider({
    app,
    router,
    modules,
    components: {
      Mask
    }
  });
  app.use(router);
  app.mount('#app');
})();
