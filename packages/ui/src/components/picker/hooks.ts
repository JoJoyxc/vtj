import { computed } from 'vue';
import { toArray } from '@vtj/utils';
import type { Emits } from '../shared';
import type { PickerProps, PickerEmits, PickerColumns } from './types';

export function useCurrentValue(props: PickerProps, emit: Emits<PickerEmits>) {
  const { multiple, valueKey = 'value', labelKey = 'label' } = props;

  const getter = (value: any) => {
    if (typeof value === 'object') {
      return {
        label: value[labelKey],
        value: value[valueKey]
      };
    }
    return value;
  };

  const setter = (value: any) => {
    if (typeof value === 'object') {
      return {
        [labelKey]: value[labelKey] ?? value.label,
        [valueKey]: value[valueKey] ?? value.value
      };
    }
    return value;
  };

  return computed({
    get() {
      if (multiple) {
        return toArray(props.modelValue || []).map((n) => getter(n));
      } else {
        return getter(props.modelValue);
      }
    },
    set(val: any) {
      const data = multiple
        ? toArray(val || []).map((n) => setter(n))
        : setter(val);
      emit('update:modelValue', data);
      emit('change', data);
    }
  });
}

export function useGridColumns(props: PickerProps) {
  const { multiple, columns = [] } = props;
  return computed(() => {
    const presets: PickerColumns = [
      {
        type: multiple ? 'checkbox' : 'radio',
        width: 50,
        fixed: 'left'
      },
      {
        type: 'seq',
        title: '序号',
        width: 60,
        fixed: 'left'
      }
    ];
    return presets.concat(columns);
  });
}
