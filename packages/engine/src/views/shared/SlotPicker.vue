<template>
  <Dialog title="提示" width="600px" height="200px" v-model="modelValue">
    <div>该组件支持多个插槽，请选择放置到其中一个</div>
    <div class="vtj-designer__slots">
      <div
        v-for="item in props.slots"
        @click="onClick(item)"
        class="vtj-designer__slot">
        {{ item.name }}
      </div>
    </div>
  </Dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { ComponentSlot } from '../../core';
import Dialog from './Dialog.vue';
export interface Props {
  slots: ComponentSlot[];
}

const props = withDefaults(defineProps<Props>(), {
  slots: () => []
});

const modelValue = ref(true);

const emit = defineEmits(['pick']);

const onClick = (item: ComponentSlot) => {
  emit('pick', item);
};
</script>
