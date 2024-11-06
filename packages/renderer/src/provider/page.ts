import { defineComponent, h } from 'vue';
import { useRoute } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { useProvider } from './provider';
export const PageContainer = defineComponent({
  name: 'VtjPageContainer',
  async setup() {
    const provider = useProvider();
    const route = useRoute();
    const id = route.params.id as string;
    const file = id ? provider.getPage(id) : provider.getHomepage();
    const component = file ? await provider.getRenderComponent(file.id) : null;
    if (file) {
      Object.assign(route.meta, file.meta || {});
      useTitle(file.title || 'VTJ');
    }
    return {
      provider,
      component,
      file,
      query: route.query,
      meta: file?.meta
    };
  },
  render() {
    const { component, query } = this;
    if (component) {
      return h(component, query);
    } else {
      return h('div', '页面不存在');
    }
  }
});
