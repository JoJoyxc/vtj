import { createApp } from 'vue';
import Designer from './views/designer/index.vue';
import '@/style/index.scss';
const app = createApp(Designer);
app.mount('#app');
