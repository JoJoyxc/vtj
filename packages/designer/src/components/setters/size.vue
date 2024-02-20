<template>
  <XInputUnit
    clearable
    :unit="unit"
    :with-unit="!!unit"
    :model-value="props.modelValue"
    @change="onChange"
    v-bind="$attrs">
  </XInputUnit>
</template>
<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { XInputUnit } from '@vtj/ui';

  export interface Props {
    modelValue?: string;
  }

  const props = defineProps<Props>();
  const emit = defineEmits(['change']);
  const isPx = ref(true);
  const unit = computed(() => (isPx.value ? 'px' : undefined));

  const onChange = (val: any) => {
    isPx.value = !!Number(val);
    emit('change', isPx.value ? val + 'px' : val);
  };

  watch(
    () => props.modelValue,
    (v) => {
      if (v) {
        isPx.value = !!Number(v);
      }
    },
    { immediate: true }
  );

  defineOptions({
    name: 'SizeSetter'
  });
</script>
