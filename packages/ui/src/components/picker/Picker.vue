<template>
  <ElSelect
    ref="selectRef"
    class="x-picker"
    :teleported="false"
    placeholder="输入关键字回车查询"
    :disabled="disabled"
    filterable
    clearable
    :multiple="props.multiple"
    collapse-tags
    collapse-tags-tooltip
    :reserve-keyword="false"
    :suffix-icon="MoreFilled"
    @keydown.capture.enter="onEnter"
    @click="onClick"
    v-model="currentValue"
    v-bind="attrs"></ElSelect>
  <Dialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    :grid-props="props.gridProps"
    :form-model="formModel"
    :columns="columns"
    :fields="props.fields"
    :loader="props.loader"
    :multiple="props.multiple"
    :onPick="onPick"
    v-bind="props.dialogProps"></Dialog>
</template>
<script lang="ts" setup>
  import { ref, useAttrs, computed } from 'vue';
  import { ElSelect } from 'element-plus';
  import { MoreFilled } from '@vtj/icons';
  import Dialog from './Dialog.vue';
  import { pickerProps } from './props';
  import type { PickerEmits } from './types';
  import { useCurrentValue, useGridColumns } from './hooks';

  const props = defineProps(pickerProps);
  const emit = defineEmits<PickerEmits>();
  const attrs = useAttrs();
  const dialogVisible = ref(false);
  const selectRef = ref();

  const currentValue = useCurrentValue(props, emit);
  const columns = useGridColumns(props);
  const formModel = ref<Record<string, any>>({});

  const disabled = computed(() => {
    return dialogVisible.value ? true : !!props.disabled;
  });

  const setDefaultQuery = async () => {
    if (props.defaultQuery) {
      const query = await props.defaultQuery();
      Object.assign(formModel.value, query || {});
    }
  };

  const onEnter = async (e: any) => {
    const inputValue = e.target.value;
    selectRef.value?.blur();
    await setDefaultQuery();
    if (props.queryKey) {
      formModel.value[props.queryKey] = inputValue;
    }
    dialogVisible.value = true;
  };
  const onClick = async (e: any) => {
    if (props.disabled) return;
    const tags = ['I', 'SVG', 'PATH'];
    if (tags.includes(e.target.nodeName.toUpperCase())) {
      selectRef.value?.blur();
      await setDefaultQuery();
      dialogVisible.value = true;
    }
  };

  const onPick = (rows: any) => {
    if (props.multiple && props.append) {
      // todo: 去重
      currentValue.value = [...currentValue.value, ...rows];
    } else {
      currentValue.value = rows;
    }
    dialogVisible.value = false;
    emit('picked', rows);
  };

  defineOptions({
    name: 'XPicker',
    inheritAttrs: false
  });
</script>
