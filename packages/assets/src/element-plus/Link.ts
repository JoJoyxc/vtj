import { ComponentDescription } from '@vtj/engine';
const Link: ComponentDescription = {
  name: 'ElLink',
  title: '链接',

  categoryId: 'base',
  doc: 'https://element-plus.org/zh-CN/component/link.html',
  package: 'element-plus',
  props: [
    {
      name: 'type',
      defaultValue: 'default',
      setters: 'SelectSetter',
      options: ['primary', 'success', 'warning', 'danger', 'info', 'default']
    },
    {
      name: 'underline',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'href',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'icon',
      defaultValue: '',
      setters: 'InputSetter'
    }
  ],
  snippet: {
    children: '链接文本'
  },
  slots: [
    {
      name: 'default'
    },
    {
      name: 'icon'
    }
  ]
};

export default Link;
