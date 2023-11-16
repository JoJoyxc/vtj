import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { uid } from '@vtj/utils';

const options: any = null;

createApp(App).mount('#app');

console.log('uid', uid());

console.log('options?.abc', options?.abc);
