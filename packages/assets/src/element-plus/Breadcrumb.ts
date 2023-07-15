import { ComponentDescription } from '@vtj/engine';
const Breadcrumb: ComponentDescription[] = [
  {
    name: 'ElBreadcrumb',
    childIncludes: ['ElBreadcrumbItem'],
    title: '面包屑',

    categoryId: 'nav',
    doc: 'https://element-plus.org/zh-CN/component/breadcrumb.html',
    package: 'element-plus',
    props: [
      {
        name: 'separator',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'separatorIcon',
        defaultValue: '',
        setters: ['InputSetter']
      }
    ],
    snippet: {
      children: [
        {
          name: 'ElBreadcrumbItem',
          children: '主页'
        },
        {
          name: 'ElBreadcrumbItem',
          children: '列表'
        },
        {
          name: 'ElBreadcrumbItem',
          children: '详情'
        }
      ]
    }
  },
  {
    name: 'ElBreadcrumbItem',
    title: '面包屑item',

    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'to',
        defaultValue: '',
        setters: ['InputSetter', 'JSONSetter']
      },
      {
        name: 'replace',
        defaultValue: '',
        setters: 'InputSetter'
      }
    ],
    snippet: {
      name: 'ElBreadcrumbItem',
      children: 'BreadcrumbItem'
    }
  }
];

export default Breadcrumb;
