export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/preview/:id',
    name: 'vtj-preview',
    component: () => import('@/views/preview.vue'),
    props: (route: any) => route.query
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/not-found.vue')
  }
];
