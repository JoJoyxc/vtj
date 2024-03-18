import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AMentions',
    alias: 'Mentions',
    label: '提及',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/mentions-cn',
    props: [
      {
        name: 'autofocus',
        label: 'autofocus',
        title: '自动获得焦点',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'defaultValue',
        label: 'defaultValue',
        title: '默认值',
        setters: 'StringSetter'
      },
      {
        name: 'filterOption',
        label: 'filterOption',
        title: '自定义过滤逻辑',
        setters: ['BooleanSetter', 'FunctionSetter']
      },
      {
        name: 'getPopupContainer',
        label: 'getPopupContainer',
        title: '指定建议框挂载的 HTML 节点',
        setters: 'FunctionSetter'
      },
      {
        name: 'notFoundContent',
        label: 'notFoundContent',
        title: '当下拉列表为空时显示的内容',
        setters: 'StringSetter',
        defaultValue: 'Not Found'
      },
      {
        name: 'placement',
        label: 'placement',
        title: '弹出层展示位置',
        setters: 'SelectSetter',
        options: ['top', 'bottom'],
        defaultValue: 'bottom'
      },
      {
        name: 'prefix',
        label: 'prefix',
        title: '设置触发关键字',
        setters: ['StringSetter', 'StringArraySetter'],
        defaultValue: '@'
      },
      {
        name: 'split',
        label: 'split',
        title: '设置选中项前后分隔符',
        setters: 'StringSetter',
        defaultValue: ' '
      },
      {
        name: 'status',
        label: 'status',
        title: '设置校验状态',
        setters: 'SelectSetter',
        options: ['error', 'warning'],
        defaultValue: ' ' //?? -
      },
      {
        name: 'validateSearch',
        label: 'validateSearch',
        title: '自定义触发验证逻辑',
        setters: 'FunctionSetter' //?? (text: string, props: MentionsProps) => void
      },
      {
        name: 'value(v-model)',
        label: 'value(v-model)',
        title: '设置值',
        setters: 'StringSetter'
      },
      {
        name: 'options',
        label: 'options',
        title: '选项配置',
        setters: 'ObjectSetter', //?? Options
        defaultValue: []
      },
      {
        name: 'option',
        label: 'option',
        title: '通过 option 插槽，自定义节点'
      }
    ],
    events: ['blur', 'change', 'focus', 'search', 'select'],
    slots: ['notFoundContent', 'option']
  }
];
export default components;
