import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/local'
  },
  {
    path: '/local',
    name: 'local',
    component: () => import('./views/local/index.vue')
  },
  {
    path: '/local/preview/:id',
    name: 'localPreview',
    component: () => import('./views/index.vue')
  },
  {
    path: '/example',
    name: 'example',
    component: () => import('./views/index.vue')
  },
  {
    path: '/example/setup',
    name: 'exampleSetup',
    component: () => import('./views/index.vue')
  },
  {
    path: '/example/preview/:id',
    name: 'examplePreview',
    component: () => import('./views/index.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
