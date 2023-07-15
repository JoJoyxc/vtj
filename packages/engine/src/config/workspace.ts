import { Widget } from '../core';
export const workspace: Array<Widget> = [
  {
    name: 'designer',
    type: 'Designer',
    region: 'workspace',
    disabled: false,
    order: 0,
    trigger: {
      label: '设计视图',
      type: 'tab'
    }
  },
  {
    name: 'schema',
    type: 'Schema',
    region: 'workspace',
    disabled: false,
    order: 1,
    trigger: {
      label: 'Schema',
      type: 'tab',
      closable: true
    }
  },
  // {
  //   name: 'code',
  //   type: 'Empty',
  //   region: 'workspace',
  //   disabled: false,
  //   order: 2,
  //   trigger: {
  //     label: '代码预览',
  //     type: 'tab',
  //     closable: true
  //   }
  // },
  // {
  //   name: 'terminal',
  //   type: 'Empty',
  //   region: 'workspace',
  //   disabled: false,
  //   order: 2,
  //   trigger: {
  //     label: '终端输出',
  //     type: 'tab',
  //     closable: true
  //   }
  // },
  // {
  //   name: 'market',
  //   type: 'Empty',
  //   region: 'workspace',
  //   disabled: false,
  //   order: 2,
  //   trigger: {
  //     label: '物料市场',
  //     type: 'tab',
  //     closable: true
  //   }
  // },
  {
    name: 'docs',
    type: 'Docs',
    region: 'workspace',
    disabled: false,
    order: 2,
    props: {
      url: 'https://element-plus.org/zh-CN/'
    },
    trigger: {
      label: '帮助中心',
      type: 'tab',
      closable: true
    }
  }
];
