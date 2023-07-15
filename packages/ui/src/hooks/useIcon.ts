import {
  defineComponent,
  h,
  computed,
  ComputedRef,
  DefineComponent,
  isVNode
} from 'vue';
import { IconParam, XIcon, IconProps } from '../components';

export function useIconProps(icon?: IconParam): ComputedRef<IconProps | null> {
  return computed(() => {
    if (icon) {
      if (
        typeof icon === 'string' ||
        (icon as DefineComponent).setup ||
        (icon as DefineComponent).render ||
        isVNode(icon)
      ) {
        return {
          icon
        } as IconProps;
      } else {
        return icon as IconProps;
      }
    }
    return null;
  });
}

export function useIcon(icon?: IconParam) {
  const props = useIconProps(icon);
  return props.value
    ? defineComponent({ render: () => h(XIcon, props.value) })
    : null;
}
