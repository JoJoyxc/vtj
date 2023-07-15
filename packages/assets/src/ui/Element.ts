import { ComponentDescription } from '@vtj/engine';
const component: ComponentDescription = {
  name: 'XElement',
  title: 'HTMl元素',
  categoryId: 'base',
  package: '@vtj/ui',
  props: [
    {
      name: 'tag',
      label: '标签名',
      defaultValue: 'div',
      setters: 'InputSetter'
    }
  ],
  snippet: {
    children: 'HTMl标签文本内容'
  }
};

export default component;
