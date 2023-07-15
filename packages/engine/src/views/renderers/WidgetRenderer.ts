import {
  defineComponent,
  h,
  inject,
  ref,
  computed,
  onMounted,
  onUnmounted,
  getCurrentInstance,
  watch
} from 'vue';
import { ENGINE_KEY } from '../../core';
export const WidgetRenderer = defineComponent({
  name: 'WidgetRenderer',
  props: {
    name: String,
    type: [String, Object],
    props: Object,
    disabled: Boolean,
    extendProps: Object,
    order: Number,
    visible: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { slots }) {
    const engine = inject(ENGINE_KEY);
    const isActive = ref(props.visible);
    const component = computed(() => {
      if (props.type && engine?.skeleton) {
        return engine?.skeleton.getComponent(props.type);
      }
      return null;
    });
    watch(
      () => props.visible,
      (v) => {
        if (v) {
          isActive.value = v;
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      const skeleton = engine?.skeleton;
      if (props.name && skeleton) {
        const instance = getCurrentInstance();
        skeleton.widgetInstances[props.name] = instance?.refs[props.name];
      }
    });

    onUnmounted(() => {
      const skeleton = engine?.skeleton;
      if (props.name && skeleton) {
        delete skeleton.widgetInstances[props.name];
      }
    });

    return () => {
      if (component.value && !props.disabled && isActive.value) {
        return h(component.value, {
          ref: props.name,
          name: props.name,
          extendProps: props.extendProps,
          order: props.order,
          style: {
            display: props.visible ? '' : 'none'
          },
          ...props.props
        });
      }
      return null;
    };
  }
});
