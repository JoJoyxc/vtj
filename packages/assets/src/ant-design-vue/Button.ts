import { ComponentDescription } from '@vtj/engine';

const components: ComponentDescription[] = [
  {
    name: 'Button',
    alias: 'AButton',
    title: '按钮',
    categoryId: 'base',
    doc: 'https://www.antdv.com/components/button-cn',
    package: 'ant-design-vue',
    props: [
      {
        name: 'block',
        label: 'block',
        title: '将按钮宽度调整为其父宽度的选项',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'danger',
        label: 'danger',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'disabled',
        label: 'disabled',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'ghost',
        label: 'ghost',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'href',
        label: 'href',
        setters: 'InputSetter'
      },
      {
        name: 'loading',
        label: 'loading',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'shape',
        label: 'shape',
        setters: 'SelectSetter',
        options: ['default', 'circle', 'round'],
        defaultValue: 'default'
      },
      {
        name: 'size',
        label: 'size',
        setters: 'SelectSetter',
        options: ['large', 'middle', 'small'],
        defaultValue: 'middle'
      },
      {
        name: 'target',
        label: 'target',
        setters: 'InputSetter',
        title: '相当于 a 链接的 target 属性，href 存在时生效'
      },
      {
        name: 'type',
        label: 'type',
        setters: 'SelectSetter',
        options: ['primary', 'ghost', 'dashed', 'link', 'text', 'default'],
        defaultValue: 'default'
      }
    ],
    events: ['click'],
    slots: ['icon'],
    snippet: {
      children: 'Button'
    }
  },
  {
    name: 'Group',
    alias: 'AButtonGroup',
    parent: 'Button',
    title: '按钮组',
    categoryId: 'base',
    doc: 'https://www.antdv.com/components/button-cn',
    package: 'ant-design-vue',
    snippet: {
      children: [
        {
          name: 'Button',
          children: 'Button1'
        },
        {
          name: 'Button',
          children: 'Button2'
        },
        {
          name: 'Button',
          children: 'Button3'
        }
      ]
    }
  }
];

export default components;
