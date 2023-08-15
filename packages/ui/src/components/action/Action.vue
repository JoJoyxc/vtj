<template>
  <div class="x-action">
    <component :is="action"> </component>
  </div>
</template>

<script lang="ts" setup>
  import { computed, markRaw, h, VNode, useSlots } from 'vue';
  import {
    ElBadge,
    ElTooltip,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem
  } from 'element-plus';
  import { actionProps, ActionEmits } from './types';
  import { useTooltip, useBadge, useDropdown } from './hooks';
  import Trigger from './Trigger.vue';

  defineOptions({
    name: 'XAction'
  });

  const props = defineProps(actionProps);
  const slots = useSlots();
  const emit = defineEmits<ActionEmits>();

  const tooltip = useTooltip(props);
  const badge = useBadge(props);
  const dropdown = useDropdown(props);

  const onClick = () => {
    emit('click', props);
  };

  const onCommand = (command: any) => {
    const item = props.menus?.find((n) => n.command === command);
    emit('command', item);
  };

  const wrapBadge = (node: VNode | VNode[]) => {
    return h(ElBadge, badge.value, () => ([] as VNode[]).concat(node));
  };
  const wrapDropdown = (node: VNode) => {
    return h(
      ElDropdown,
      { ...dropdown.value, disabled: props.disabled, onCommand },
      {
        default: () => [node],
        dropdown: () => [
          h(ElDropdownMenu, () =>
            (props.menus || []).map((item) => {
              return h(ElDropdownItem, item, () => item.label);
            })
          )
        ]
      }
    );
  };

  const wrapTooltip = (node: VNode) => {
    return h(ElTooltip, { ...tooltip.value, disabled: props.disabled }, () => [
      node
    ]);
  };

  const action = computed(() => {
    let vnode: VNode = slots.default
      ? slots.default()[0]
      : h(markRaw(Trigger), { ...props, onClick });
    if (badge.value) {
      vnode = wrapBadge(vnode);
    }
    if (dropdown.value) {
      vnode = wrapDropdown(vnode);
    }
    if (tooltip.value) {
      vnode = wrapTooltip(vnode);
    }
    return vnode;
  });
</script>
