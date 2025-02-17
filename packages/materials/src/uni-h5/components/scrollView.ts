import type { MaterialDescription } from '@vtj/core';

const ScrollView: MaterialDescription = {
  name: 'ScrollView',
  label: '滚动视图',
  categoryId: 'container',
  props: [
    {
      name: 'scroll-x',
      title: '允许横向滚动',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'scroll-y',
      title: '允许纵向滚动',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'upper-threshold',
      title: '距顶部/左边多远时（单位px），触发 scrolltoupper 事件',
      defaultValue: 50,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'lower-threshold',
      title: '距底部/右边多远时（单位px），触发 scrolltolower 事件',
      defaultValue: 50,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'scroll-top',
      title: '设置竖向滚动条位置',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'scroll-left',
      title: '设置横向滚动条位置',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'scroll-into-view',
      title:
        '值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素',
      setters: 'StringSetter'
    },
    {
      name: 'scroll-with-animation',
      title: '在设置滚动条位置时使用动画过渡',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'enable-back-to-top',
      title: 'iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-scrollbar',
      title: '控制是否出现滚动条',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'refresher-enabled',
      title: '开启自定义下拉刷新',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'refresher-threshold',
      title: '设置自定义下拉刷新阈值',
      defaultValue: 45,
      setters: 'NumberSetter'
    }
  ],
  snippet: {
    children: 'Button'
  }
};

export default ScrollView;
