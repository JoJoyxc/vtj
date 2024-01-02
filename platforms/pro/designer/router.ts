import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'workbench',
    component: () => import('./views/workbench.vue')
  },
  {
    path: '/preview/:id',
    name: 'preview',
    component: () => import('./views/preview.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
