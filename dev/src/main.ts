import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@vtj/ui/dist/style.css';
import '@/style/index.scss';
import 'element-plus/theme-chalk/dark/css-vars.css';
const app = createApp(App);
app.use(router);
app.mount('#app');
