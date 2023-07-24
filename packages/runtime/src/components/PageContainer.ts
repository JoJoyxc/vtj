import { defineComponent, h, computed, ref, markRaw } from 'vue';
import { useRoute } from 'vue-router';
import { useProvider } from '../hooks';
import { useTitle } from '@vueuse/core';
import Loading from './Loading';
import VtjEmpty from './Empty';
export default defineComponent({
  name: 'VtjPageContainer',
  setup(props) {
    const route = useRoute();
    const fileId = computed(() => route.params.id as string);
    const provider = useProvider();
    const { modules = {} } = provider?.options || {};
    const page = computed(() => {
      const pages = provider?.pages?.value || [];
      return pages.find((n) => n.id === fileId.value);
    });
    const renderer = ref();
    const loading = ref<boolean>(true);
    const loader = modules[`/src/views/pages/${fileId.value}.vue`];
    loading.value = !!loader;
    if (loader) {
      loader()
        .then((r) => {
          renderer.value = markRaw(r.default);
        })
        .finally(() => {
          loading.value = false;
        });
    }
    const title = computed(() => page.value?.title || '');
    useTitle(title);
    return {
      fileId,
      renderer,
      loading,
      title
    };
  },
  render() {
    if (this.renderer) {
      return h(this.renderer, this.$attrs);
    } else if (this.loading) {
      return h(Loading);
    } else {
      return h(VtjEmpty);
    }
  }
});
