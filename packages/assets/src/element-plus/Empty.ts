import { ComponentDescription } from '@vtj/engine';
const Empty: ComponentDescription = {
  name: 'ElEmpty',
  title: '空状态',
  doc: 'https://element-plus.org/zh-CN/component/empty.html',

  categoryId: 'data',
  package: 'element-plus',
  props: [
    {
      name: 'image',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'imageSize',
      defaultValue: '',
      setters: 'NumberSetter'
    },
    {
      name: 'description',
      defaultValue: '',
      setters: 'InputSetter'
    }
  ],
  slots: [
    {
      name: 'default'
    },
    {
      name: 'image'
    },
    {
      name: 'description'
    }
  ]
};

export default Empty;
