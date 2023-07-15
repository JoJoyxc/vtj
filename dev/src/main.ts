import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'element-plus/dist/index.css';
import '@vtj/ui/lib/style.css';
// import '@vtj/icons/lib/style.css';
// import '@vtj/engine/lib/style.css';
import '@/style/index.scss';
// import { Setting } from '@element-plus/icons-vue';

async function initApp() {
  const app = createApp(App);
  // app.component('Setting', Setting);
  app.use(router);
  app.mount('#app');
  return app;
}

initApp();
