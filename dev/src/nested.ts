import { createApp } from 'vue';
import Designer from './views/designer/index.vue';
import '@vtj/ui/dist/style.css';
import '@/style/index.scss';
import 'element-plus/theme-chalk/dark/css-vars.css';
const app = createApp(Designer);
app.mount('#app');
