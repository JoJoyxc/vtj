import { defineComponent, h, markRaw } from 'vue';

import { isJSExpression, isJSFunction } from '../../utils';
import { Setter } from '../../core';
import { SetterValueTypes, buildInSetters } from '../setters';
import SetterView from '../shared/SetterView.vue';

export const SetterRenderer = defineComponent({
  name: 'SetterRenderer',
  props: {
    name: String,
    label: String,
    title: String,
    value: {
      type: [String, Object, Array, Number, Boolean],
      default: undefined
    },
    setters: {
      type: [String, Object, Array],
      required: true,
      default() {
        return [];
      }
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    variable: {
      type: Boolean,
      default: true
    },
    removable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedSetters() {
      const setters = Array.isArray(this.setters)
        ? this.setters
        : [this.setters];
      return setters.map((setter) => {
        let component;
        if (typeof setter === 'string') {
          //@ts-ignore
          component = this.getComopnent(setter);
          return {
            component: markRaw(component),
            name: setter,
            label: setter,
            props: {}
          };
        } else {
          const item: Setter = setter as Setter;
          //@ts-ignore
          component = item.component || this.getComopnent(item.name);
          return {
            component: markRaw(component),
            name: item.name,
            label: item.label || item.name,
            props: item.props
          };
        }
      });
    },
    computedOptions() {
      const options = this.options || [];
      return options.map((option) => {
        if (typeof option === 'string') {
          return {
            label: option,
            value: option
          };
        }
        return option;
      });
    },
    defaultSetter() {
      const { value, computedSetters } = this;
      let type: string = typeof value;
      if (type === 'object') {
        if (Array.isArray(value)) {
          type = 'array';
        } else if (isJSExpression(value)) {
          type = 'JSExpression';
        } else if (isJSFunction(value)) {
          type = 'JSFunction';
        }
      }
      const setters = SetterValueTypes[type] || [];
      if (setters.length) {
        return (
          computedSetters.find((setter) => setters.includes(setter.name)) ||
          computedSetters[0]
        )?.name;
      }
      return computedSetters[0]?.name;
    }
  },
  render() {
    const {
      name,
      label,
      title,
      value,
      computedSetters,
      computedOptions,
      variable,
      changeValue,
      defaultSetter,
      removable,
      onRemove
    } = this;
    return h(SetterView, {
      name,
      label,
      title,
      setters: computedSetters,
      defaultSetter: defaultSetter,
      variable,
      value,
      removable,
      options: computedOptions,
      onChange: changeValue,
      onRemove: onRemove
    } as any);
  },
  emits: ['change', 'remove'],
  methods: {
    getComopnent(name: any) {
      return typeof name === 'string'
        ? buildInSetters[name] || buildInSetters.InputSetter
        : name;
    },
    changeValue(val: any) {
      this.$emit('change', this.name, val);
    },
    onRemove(name: string) {
      this.$emit('remove', name);
    }
  }
});
