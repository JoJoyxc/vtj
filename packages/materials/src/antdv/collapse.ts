import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ACollapse',
    alias: 'Collapse',
    label: '折叠面板',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/collapse-cn',
    props: [
      {
        name: 'accordion',
        label: 'accordion',
        title: '手风琴模式',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'activeKey',
        label: 'activeKey',
        title: '当前激活 tab 面板的 key',
        setters: ['StringSetter', 'NumberSetter', 'ArraySetter']
      },
      {
        name: 'bordered',
        label: 'bordered',
        title: '带边框风格的折叠面板',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'collapsible',
        label: 'collapsible',
        title: '所有子面板是否可折叠或指定可折叠触发区域',
        setters: 'SelectSetter',
        options: ['header', 'icon', 'disabled']
      },
      {
        name: 'destroyInactivePanel',
        label: 'destroyInactivePanel',
        title: '销毁折叠隐藏的面板',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'expandIcon',
        label: 'expandIcon',
        title: '自定义切换图标',
        setters: 'FunctionSetter' //?? 	Function(props):VNode | slot="expandIcon" slot-scope="props"|#expandIcon="props"
      },
      {
        name: 'expandIconPosition',
        label: 'expandIconPosition',
        title: '设置图标位置',
        setters: 'SelectSetter',
        options: ['start', 'end']
      },
      {
        name: 'ghost',
        label: 'ghost',
        title: '使折叠面板透明且无边框',
        setters: 'BooleanSetter',
        defaultValue: false
      }
    ],
    events: ['change', 'update:activeKey'],
    slots: ['expandIcon']
  },
  {
    name: 'ACollapsePanel',
    alias: 'Panel',
    parent: 'Collapse',
    label: '折叠面板项',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/collapse-cn',
    props: [
      {
        name: 'collapsible',
        label: 'collapsible',
        title: '是否可折叠或指定可折叠触发区域',
        setters: 'SelectSetter',
        options: ['header', 'disabled']
      },
      {
        name: 'extra',
        label: 'extra',
        title: '自定义渲染每个面板右上角的内容'
        // setters: 'StringSetter' //?? 	VNode | slot
      },
      {
        name: 'forceRender',
        label: 'forceRender',
        title: '被隐藏时是否渲染 DOM 结构',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'header',
        label: 'header',
        title: '面板头内容',
        setters: 'StringSetter' //?? string slot
      },
      {
        name: 'key',
        label: 'key',
        title: '对应 activeKey',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'showArrow',
        label: 'sho是否展示当前面板的箭头wArrow',
        title: '是否展示当前面板的箭头',
        setters: 'BooleanSetter',
        defaultValue: true
      }
    ],
    slots: ['extra', 'header']
  }
];
export default components;
