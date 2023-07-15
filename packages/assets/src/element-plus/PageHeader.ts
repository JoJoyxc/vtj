import { ComponentDescription } from '@vtj/engine';

const components: ComponentDescription = {
  name: 'ElPageHeader',
  title: '页头',

  doc: 'https://element-plus.org/zh-CN/component/page-header.html',
  categoryId: 'nav',
  package: 'element-plus',
  props: [
    {
      name: 'icon',
      defaultValue: undefined,
      setters: 'InputSetter'
    },
    {
      name: 'title',
      defaultValue: 'Back',
      setters: 'InputSetter'
    },
    {
      name: 'content',
      defaultValue: '',
      setters: 'InputSetter'
    }
  ],
  events: [
    {
      name: 'back'
    }
  ],
  slots: [
    {
      name: 'icon'
    },
    {
      name: 'title'
    },
    {
      name: 'content'
    },
    {
      name: 'extra'
    },
    {
      name: 'breadcrumb'
    },
    {
      name: 'default'
    }
  ],
  snippet: {
    name: 'ElPageHeader',
    children: [
      {
        name: 'component',
        slot: 'content',
        props: {
          is: 'span'
        },
        children: 'Title'
      }
    ]
  }
};

export default components;
