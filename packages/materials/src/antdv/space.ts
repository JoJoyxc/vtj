import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ASpace',
    alias: 'Space',
    label: '间距',
    categoryId: 'layout',
    doc: 'https://www.antdv.com/components/space-cn',
    props: [
      {
        name: 'align',
        label: 'align',
        title: '垂直对齐方式',
        setters: 'SelectSetter',
        options: ['top', 'middle', 'bottom', 'stretch'],
        defaultValue: 'top'
      },
      {
        name: 'direction',
        label: 'direction',
        title: '间距方向',
        setters: 'SelectSetter',
        options: ['vertical', 'horizontal'],
        defaultValue: 'horizontal'
      },
      {
        name: 'size',
        label: 'size',
        title: '间距大小',
        setters: 'SelectSetter',
        options: ['small', 'middle', 'large', 'number'],
        defaultValue: 'small'
      },
      {
        name: 'split',
        label: 'split',
        title: '设置拆分'
      },
      {
        name: 'wrap',
        label: 'wrap',
        title: '是否自动换行，仅在 horizontal 时有效',
        setters: 'BooleanSetter',
        defaultValue: false
      }
    ],
    slots: ['split'],
    snippet: {
      children: [
        { name: 'Button', props: { type: 'primary' }, children: 'Button1' },
        { name: 'Button', props: { type: 'danger' }, children: 'Button2' }
      ]
    }
  },
  {
    name: 'ASpaceCompact',
    alias: 'Compact',
    parent: 'Space',
    label: '紧凑间距',
    categoryId: 'layout',
    doc: 'https://www.antdv.com/components/space-cn',
    props: [
      {
        name: 'block',
        label: 'block',
        title: '将宽度调整为父元素宽度的选项',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'direction',
        label: 'direction',
        title: '指定排列方向',
        setters: 'SelectSetter',
        options: ['vertical', 'horizontal'],
        defaultValue: 'horizontal'
      },
      {
        name: 'size',
        label: 'size',
        title: '子组件大小',
        setters: 'SelectSetter',
        options: ['small', 'middle', 'large'],
        defaultValue: 'small'
      }
    ],
    snippet: {
      children: [
        {
          name: 'input',
          props: { style: { width: '20%' }, defaultValue: '7259' }
        },
        {
          name: 'input',
          props: { style: { width: '30%' }, defaultValue: '9527' }
        },
        {
          name: 'button',
          props: { type: 'primary' },
          children: 'Button 1'
        },
        {
          name: 'button',
          props: { type: 'primary' },
          children: 'Button 2'
        },
        {
          name: 'button',
          props: { type: 'primary' },
          children: 'Button 3'
        }
      ]
    }
  }
];

export default components;
