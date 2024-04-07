import { defineAsyncComponent } from 'vue';

export const XCkeditor = defineAsyncComponent(() =>
  import('./Ckeditor.vue').then((res) => res.default)
);

export * from './types';
