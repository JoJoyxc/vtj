export const icons = [
  {
    path: '/icon/',
    component: () => import('@/views/icons/index.vue')
  },
  {
    path: '/icon/svg',
    component: () => import('@/views/icons/svg.vue')
  },
  {
    path: '/icon/el',
    component: () => import('@/views/icons/el.vue')
  }
];
