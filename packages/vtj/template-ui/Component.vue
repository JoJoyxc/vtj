<template>
  <div class="x-my-component">Component</div>
</template>
<script lang="ts" setup>
import { componentProps, componentEmits } from './component';
const props = defineProps(componentProps);
const emit = defineEmits(componentEmits);

defineOptions({
  name: 'XComponent'
});

defineExpose({});
</script>
