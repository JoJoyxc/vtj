import { defineComponent, h } from 'vue';
import { ElEmpty } from 'element-plus';
export default defineComponent({
  name: 'VtjEmpty',
  render() {
    return h(ElEmpty, { description: '页面不存在！' });
  }
});
