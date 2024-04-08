import { defineAsyncComponent } from 'vue';

export const XCKEditor = defineAsyncComponent(
  async () => (await import('./Ckeditor.vue')).default
);

export * from './types';
