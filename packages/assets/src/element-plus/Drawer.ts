import { ComponentDescription } from '@vtj/engine';
const components: ComponentDescription = {
  name: 'ElDrawer',
  title: '抽屉',

  categoryId: 'other',
  doc: 'https://element-plus.org/zh-CN/component/drawer.html',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'appendToBody',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'lockScroll',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'beforeClose',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'closeOnClickModal',
      label: '点击蒙层关闭',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'closOonPressEscape',
      label: 'ESC键关闭',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'openDelay',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'closeDelay',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'customClass',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'destroyOnClose',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'modal',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'direction',
      defaultValue: 'rtl',
      setters: 'SelectSetter',
      options: ['rtl', 'ltr', 'ttb', 'btt']
    },
    {
      name: 'showClose',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'size',
      defaultValue: '30%',
      title:
        'Drawer 窗体的大小, 当使用 number 类型时, 以像素为单位, 当使用 string 类型时, 请传入 x%, 否则便会以 number 类型解释',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'title',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'withHeader',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'modalClass',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'zIndex',
      defaultValue: 0,
      setters: 'NumberSetter'
    }
  ],
  events: [
    {
      name: 'open'
    },
    {
      name: 'opened'
    },
    {
      name: 'close'
    },
    {
      name: 'closed'
    }
  ],
  slots: [
    {
      name: 'default'
    },
    {
      name: 'header'
    },
    {
      name: 'footer'
    }
  ],
  snippet: {
    name: 'ElDrawer',
    children: '抽屉内容',
    props: {
      title: '标题',
      modelValue: true
    }
  }
};

export default components;
