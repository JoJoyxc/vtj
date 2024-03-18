import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ATag',
    alias: 'Tag',
    label: '标签',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/tag-cn',
    props: [
      {
        name: 'closable',
        label: 'closable',
        title: '标签是否可以关闭',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'closeIcon',
        label: 'closeIcon',
        title: '自定义关闭按钮'
      },
      {
        name: 'color',
        label: 'color',
        title: '标签色',
        setters: 'StringSetter'
      },
      {
        name: 'icon',
        label: 'icon',
        title: '设置图标'
      },
      {
        name: 'bordered',
        label: 'bordered',
        title: '是否有边框',
        setters: 'BooleanSetter',
        defaultValue: true
      }
    ],
    events: ['close'],
    slots: ['closeIcon', 'icon']
  },
  {
    name: 'ACheckableTag',
    alias: 'CheckableTag',
    parent: 'Tag',
    label: '可选择标签',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/tag-cn',
    props: [
      {
        name: 'checked',
        label: 'checked',
        title: '设置标签的选中状态',
        setters: 'BooleanSetter',
        defaultValue: false
      }
    ],
    events: ['change', 'update:checked']
  }
];
export default components;
