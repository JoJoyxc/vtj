import { createRouter, createWebHashHistory } from 'vue-router';
import { utils, ui, lcdp, icons } from './routes';

const routes: any = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/not-found.vue')
  },
  ...utils,
  ...ui,
  ...lcdp,
  ...icons
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
