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
    const file = provider.getPage(id);
    const component = await provider.getRenderComponent(id);
    useTitle(file?.title || 'VTJ');
    return {
      provider,
      component,
      file,
      query: route.query
    };
  },
  render() {
    return h(this.component, this.query);
  }
});
