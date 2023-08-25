import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import * as VtjIcons from '@vtj/icons';
import '@vtj/ui/lib/style.css';
import '@vtj/icons/lib/style.css';
import '@/style/index.scss';

const app = createApp(App);
app.use(router);
app.use(VtjIcons);
app.mount('#app');
