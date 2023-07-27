import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createProvider } from '@vtj/runtime';
import { merge } from '@vtj/utils';
import 'element-plus/dist/index.css';
import '@vtj/icons/lib/style.css';
import '@vtj/engine/lib/style.css';
import '@vtj/ui/lib/style.css';
import '@/style/index.scss';
import { ideConfig } from '@/api';
import Mask from '@/components/Mask.vue';

const app = createApp(App);

const modules = import.meta.glob([
  '/.vtj/project/*.json',
  '/.vtj/file/*.json',
  '/src/views/pages/*.vue',
  '/src/components/blocks/*.vue'
]);

(async () => {
  const options: any = await ideConfig();
  await createProvider(
    merge(
      {
        service: 'file',
        project: { home: '/startup', name: '项目样例' },
        app,
        modules,
        router,
        ide: { path: '/' },
        startup: true,
        raw: true,
        components: {
          Mask
        }
      },
      options
    )
  );
  app.use(router);
  app.mount('#app');
})();
