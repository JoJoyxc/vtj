import {
  defineComponent,
  h,
  computed,
  ComputedRef,
  DefineComponent,
  isVNode,
  MaybeRef,
  unref
} from 'vue';
import { IconParam, XIcon, IconProps } from '../components';

export function useIconProps(
  iconRef: MaybeRef<IconParam | undefined>
): ComputedRef<IconProps | null> {
  return computed(() => {
    const icon = unref(iconRef);
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

export function useIcon(icon: MaybeRef<IconParam | undefined>) {
  const props = useIconProps(icon);
  return props.value
    ? defineComponent({ render: () => h(XIcon, props.value) })
    : null;
}
