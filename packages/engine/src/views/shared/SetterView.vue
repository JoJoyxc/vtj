<template>
  <ElFormItem class="vtj-setter" size="small" label-positon="left">
    <template #label>
      <ElTooltip
        v-if="props.title"
        placement="top-start"
        :content="props.title">
        {{ props.label || props.name }}
      </ElTooltip>
      <span v-else>{{ props.label || props.name }}</span>
    </template>
    <div class="vtj-setter__content">
      <div v-if="currentSetter" class="vtj-setter__input">
        <component
          v-if="!isBinding"
          :is="currentSetter.component"
          v-bind="currentSetter.props"
          :options="props.options"
          v-model="modelValue"
          @change="onChange"
          :disabled="isBinding"></component>
        <ElInput
          v-if="isBinding"
          class="vtj-expression-setter"
          disabled
          model-value="JSExpression">
          <template #prefix>{{ prefix }}</template>
          <template #suffix>{{ suffix }}</template>
        </ElInput>
      </div>
      <div class="vtj-setter__action">
        <i
          v-if="props.variable"
          @click="openBinder"
          class="vtj-icon-vars"
          :class="{ 'is-active': isBinding }"
          title="绑定变量"></i>
        <ElDropdown
          v-if="props.setters.length > 1"
          :disabled="isBinding"
          size="small"
          popper-class="vtj-setter-switch"
          @command="changeSetter">
          <i class="vtj-icon-switch" title="切换设置器"></i>
          <template #dropdown>
            <ElDropdownMenu>
              <ElDropdownItem
                v-for="item in props.setters"
                :command="item"
                :key="item.name">
                <i
                  v-if="item.name == currentSetter.name"
                  class="vtj-icon-check"></i>
                <i v-else class="vtj-icon-placeholder"></i>
                {{ item.label }}
              </ElDropdownItem>
            </ElDropdownMenu>
          </template>
        </ElDropdown>
        <i
          v-if="props.removable"
          @click="onRemove"
          class="vtj-icon-remove"
          title="删除"></i>
      </div>
    </div>
    <VarBinder
      v-if="binderVisible"
      type="JSExpression"
      :value="binderValue"
      v-model="binderVisible"
      @submit="onVarsSubmit"
      @remove="onVarsRemove"></VarBinder>
  </ElFormItem>
</template>
<script lang="ts" setup>
import VarBinder from './VarBinder.vue';
import {
  ElFormItem,
  ElTooltip,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElInput
} from 'element-plus';
import { ref, watch, computed } from 'vue';
import { isJSExpression } from '../../utils';
import { Setter } from '../../core';

export interface Props {
  name: string;
  label?: string;
  title?: string;
  setters: Setter[];
  variable?: boolean;
  value?: any;
  options?: any[];
  defaultSetter?: string;
  removable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  options: () => [],
  variable: true
});

const emit = defineEmits(['change', 'remove']);

const binderVisible = ref(false);
const binderValue = ref('');
const prefix = `{{`;
const suffix = `}}`;

const currentSetter = ref(
  props.setters.find((n: Setter) => n.name === props.defaultSetter) ||
    props.setters[0]
);

const modelValue = ref(props.value);

const isBinding = computed(() => {
  return !!isJSExpression(modelValue.value);
});

const setterValueRecored: Record<string, any> = {
  [currentSetter.value.name]: modelValue.value
};

const changeSetter = (setter: Setter) => {
  setterValueRecored[currentSetter.value.name] = modelValue.value;
  currentSetter.value = setter;
  modelValue.value = setterValueRecored[setter.name as string] ?? undefined;
  onChange(modelValue.value);
};

watch(
  () => props.value,
  () => {
    modelValue.value = props.value;
  }
);
watch(
  () => props.defaultSetter,
  () => {
    currentSetter.value =
      props.setters.find((n: Setter) => n.name === props.defaultSetter) ||
      props.setters[0];
  }
);

const onChange = (value: any) => {
  emit('change', value);
};

const onRemove = () => {
  emit('remove', props.name);
};

const openBinder = () => {
  binderVisible.value = true;
  binderValue.value = isJSExpression(modelValue.value)
    ? modelValue.value.value
    : '';
};

const closeBinder = () => {
  binderVisible.value = false;
  binderValue.value = '';
};

const onVarsSubmit = (value: any) => {
  setterValueRecored[currentSetter.value.name] = modelValue.value;
  modelValue.value = value;
  emit('change', value);
  closeBinder();
};

const onVarsRemove = () => {
  closeBinder();
  modelValue.value = undefined;
  emit('change', '');
};
</script>

<style lang="scss">
@use '../../style/vars' as *;

.vtj-setter {
  .el-form-item__label {
    .el-tooltip__trigger {
      border-bottom: 1px dashed $vtj-primary-color;
      cursor: help;
    }
  }
  .el-select {
    display: block;
  }

  &__content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
  &__input {
    flex-grow: 1;
  }
  &__action {
    font-size: 14px;
    white-space: nowrap;
    i {
      cursor: pointer;
      color: $vtj-secondary-color;
      background-color: $vtj-background-color-dark-9;
      margin-left: 3px;
      padding: 4px;
      border-radius: 4px;
      &:hover {
        color: $vtj-primary-color;
        background-color: $vtj-primary-color-light-9;
      }
      &.is-active {
        color: $vtj-primary-color;
        background-color: $vtj-primary-color-light-9;
      }
    }
  }
}

.vtj-setter-switch {
  .vtj-icon-check {
    color: $vtj-primary-color;
  }
  .vtj-icon-placeholder {
    width: 13px;
  }
}

.vtj-expression-setter {
  .el-input__inner {
    text-align: center;
  }
}

.vtj-json-setter,
.vtj-function-setter {
  .el-input-group__prepend {
    padding: 0 !important;
    width: 80px;
    flex-shrink: 0;
  }
  .el-input__inner {
    color: #ccc;
  }
}
.vtj-number-setter {
  width: 100% !important;
}
</style>
