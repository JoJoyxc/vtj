import { defineComponent, ref, h, watchEffect } from 'vue';
import { useEngine } from '../framework';
import { Skeleton } from '../components';

export const SkeletonWrapper = defineComponent({
  name: 'SkeletonWrapper',
  setup() {
    const skeleton = ref();
    const engine = useEngine();
    watchEffect(() => {
      engine.skeleton = skeleton.value;
    });

    return {
      skeleton,
      engine
    };
  },
  render() {
    return h(Skeleton, { ...this.$props, ref: 'skeleton' });
  }
});

export type SkeletonWrapperInstance = InstanceType<typeof SkeletonWrapper>;
