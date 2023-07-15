import { ComponentDescription } from '@vtj/engine';
const ColorPicker: ComponentDescription = {
  name: 'ElColorPicker',
  title: '取色器',

  categoryId: 'form',
  childIncludes: false,
  doc: 'https://element-plus.org/zh-CN/component/color-picker.html',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'disabled',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'size',
      defaultValue: '',
      options: ['large', 'default', 'small'],
      setters: 'SelectSetter'
    },
    {
      name: 'showAlpha',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'colorFormat',
      defaultValue: '',
      options: ['hsl', 'hsv', 'hex', 'rgb'],
      setters: 'SelectSetter'
    },
    {
      name: 'popperClass',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'predefine',
      defaultValue: '',
      setters: 'JSONSetter'
    },
    {
      name: 'validateEvent',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  events: [
    {
      name: 'change'
    },
    {
      name: 'active-change'
    }
  ]
};

export default ColorPicker;
