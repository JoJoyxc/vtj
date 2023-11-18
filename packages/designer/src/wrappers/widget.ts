import { defineComponent, h, type PropType } from 'vue';
import { type Widget } from '../framework';

export const WidgetWrapper = defineComponent({
  name: 'WidgetWrapper',
  props: {
    widget: {
      type: Object as PropType<Widget>,
      required: true
    }
  },
  render() {
    return h(this.widget.component, this.$props);
  }
});
