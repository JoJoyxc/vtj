import { defineComponent, h, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePage } from '../hooks';
import { useTitle } from '@vueuse/core';
import Loading from './Loading';
import VtjEmpty from './Empty';
export default defineComponent({
  name: 'VtjPageContainer',
  setup(props) {
    const route = useRoute();
    const fileId = computed(() => route.params.id as string);
    const { renderer, dsl, loading } = usePage(fileId);
    const title = computed(() => dsl.value?.title || '');
    useTitle(title);
    return {
      fileId,
      renderer,
      dsl,
      loading
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
