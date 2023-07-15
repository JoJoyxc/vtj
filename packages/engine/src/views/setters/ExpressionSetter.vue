<template>
  <ElInput
    class="vtj-expression-setter"
    v-model="textValue"
    @change="handleChange">
    <template #prefix>{{ prefix }}</template>
    <template #suffix>{{ suffix }}</template>
  </ElInput>
</template>
<script lang="ts" setup>
import { ElInput } from 'element-plus';
import { JSExpression } from '../../core';
import { ref, watch } from 'vue';
import { expressionValidate } from '../../utils';
import { useCore } from '../../hooks';

export interface Props {
  modelValue?: JSExpression;
}

const { project } = useCore();

const prefix = `{{`;
const suffix = `}}`;

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => {
    return { type: 'JSExpression', value: '' };
  }
});
const emit = defineEmits(['change']);

const validate = (value: JSExpression) => {
  const context = project.current.value?.runtimeContext;
  return expressionValidate(value, context);
};

const textValue = ref(props.modelValue.value);

watch(
  () => props.modelValue.value,
  (v) => {
    textValue.value = v;
  }
);

const handleChange = (value: string) => {
  const expression: JSExpression = {
    type: 'JSExpression',
    value
  };
  if (validate(expression)) {
    emit('change', expression);
  }
};
</script>
