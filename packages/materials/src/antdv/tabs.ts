import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ATabs',
    alias: 'Tabs',
    label: '标签页',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/tabs-cn',
    props: [
      {
        name: 'activeKey(v-model)',
        label: 'activeKey(v-model)',
        title: '当前激活 tab 面板的 key',
        setters: 'StringSetter'
      },
      {
        name: 'animated',
        label: 'animated',
        title: '是否使用动画切换 Tabs，在 tabPosition="top" | "bottom" 时有效',
        setters: ['BooleanSetter', 'ObjectSetter'], //?? 	boolean | {inkBar:boolean, tabPane:boolean}
        defaultValue: true //?? true, 当 type="card" 时为 false
      },
      {
        name: 'centered',
        label: 'centered',
        title: '标签居中展示',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'destroyInactiveTabPane',
        label: 'destroyInactiveTabPane',
        title: '被隐藏时是否销毁 DOM 结构',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'hideAdd',
        label: 'hideAdd',
        title: '是否隐藏加号图标，在 type="editable-card" 时有效',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'size',
        label: 'size',
        title: '大小，提供 large middle 和 small 三种大小',
        setters: 'SelectSetter',
        options: ['large', 'middle', 'small'],
        defaultValue: 'middle'
      },
      {
        name: 'tabBarGutter',
        label: 'tabBarGutter',
        title: 'tabs 之间的间隙',
        setters: 'NumberSetter',
        defaultValue: 0 //?? 无
      },
      {
        name: 'tabBarStyle',
        label: 'tabBarStyle',
        title: 'tab bar 的样式对象',
        setters: 'ObjectSetter' //?? cssProperties
      },
      {
        name: 'tabPosition',
        label: 'tabPosition',
        title: '页签位置，可选值有 top right bottom left',
        setters: 'StringSetter',
        defaultValue: 'top'
      },
      {
        name: 'type',
        label: 'type',
        title: '页签的基本样式，可选 line、card editable-card 类型',
        setters: 'StringSetter',
        defaultValue: 'line'
      }
    ],
    events: ['change', 'edit', 'tabClick', 'tabScroll']
  },
  {
    name: 'ATabPane',
    alias: 'TabPane',
    parent: 'Tabs',
    label: '标签页签',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/tabs-cn',
    props: [
      {
        name: 'forceRender',
        label: 'forceRender',
        title: '被隐藏时是否渲染 DOM 结构',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'key',
        label: 'key',
        title: '对应 activeKey',
        setters: 'StringSetter'
      },
      {
        name: 'tab',
        label: 'tab',
        title: '选项卡头显示文字',
        setters: 'StringSetter'
      }
    ],
    slots: ['closeIcon', 'tab']
  }
];
export default components;
