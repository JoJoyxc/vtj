import { defineComponent, h, computed } from 'vue';
import { useProvider, useMask } from '../hooks';
import { RouterView, useRoute } from 'vue-router';
import DefaultEmpty from './Empty';
export default defineComponent({
  name: 'VtjMaskContainer',
  setup(props) {
    const provider = useProvider();
    const { Empty = DefaultEmpty } = provider?.options.components ?? {};
    const route = useRoute();
    const fileId = computed(() => route.params.id as string);
    const { maskable, page, Mask, maskProps } = useMask(fileId);

    return {
      Empty,
      Mask,
      maskable,
      page,
      maskProps
    };
  },
  render() {
    const { page, Mask, Empty, maskable, maskProps } = this;
    if (!page) {
      return h(Empty);
    }
    if (Mask && maskable) {
      return h(Mask, maskProps, this.$slots);
    } else {
      return h(RouterView, this.$slots);
    }
  }
});
