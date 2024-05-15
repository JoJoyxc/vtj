import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { AdapterPlugin } from '@vtj/web';
import '@/style/index.scss';
import './mock';
const app = createApp(App);
app.use(router);
app.use(AdapterPlugin, {
  vxeConfig: {
    // size: 'mini'
  }
});
app.mount('#app');
