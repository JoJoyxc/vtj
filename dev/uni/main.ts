import { createApp } from 'vue';
import { initUniFeatures } from '@vtj/uni/features';
import '@vtj/uni/src/index.scss';
import App from './pages/index.vue';

initUniFeatures();
const app = createApp(App);

app.mount('#app');
