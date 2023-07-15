import { defineComponent, h } from 'vue';
export default defineComponent({
  name: 'VtjLoading',
  render() {
    return h(
      'div',
      {
        style: {
          padding: '20px'
        }
      },
      '正在加载页面...'
    );
  }
});
