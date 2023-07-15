import { Widget } from '../core';
export const setting: Array<Widget> = [
  {
    name: 'properties',
    type: 'Properties',
    region: 'setting',
    group: 'Node',
    trigger: {
      label: '属性',
      type: 'tab'
    }
  },
  {
    name: 'events',
    type: 'Events',
    region: 'setting',
    group: 'Node',
    trigger: {
      label: '事件',
      type: 'tab'
    }
  },
  {
    name: 'directives',
    type: 'Directives',
    region: 'setting',
    group: 'Node',
    trigger: {
      label: '指令',
      type: 'tab'
    }
  },
  {
    name: 'script',
    type: 'BlockScript',
    region: 'setting',
    group: 'Block',
    trigger: {
      label: '设置',
      type: 'tab'
    }
  },
  {
    name: 'dataSources',
    type: 'DataSources',
    region: 'setting',
    group: 'Block',
    trigger: {
      label: '数据源',
      type: 'tab'
    }
  },
  {
    name: 'css',
    type: 'Css',
    region: 'setting',
    group: 'Block',
    trigger: {
      label: '样式',
      type: 'tab'
    }
  },
  {
    name: 'advanced',
    type: 'Advanced',
    region: 'setting',
    group: 'Block',
    trigger: {
      label: '定义',
      type: 'tab'
    }
  }
];
