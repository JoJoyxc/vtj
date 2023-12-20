import { defineComponent, h } from 'vue';
import { Setter } from '../components';

export const SetterWrapper = defineComponent({
  name: 'SetterWrapper',
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
  render() {
    return h(Setter, {});
  }
});
