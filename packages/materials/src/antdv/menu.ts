import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AMenu',
    alias: 'Menu',
    label: '导航菜单',
    categoryId: 'nav',
    doc: 'https://www.antdv.com/components/menu-cn',
    props: [
      {
        name: 'forceSubMenuRender',
        label: 'forceSubMenuRender',
        title: '在子菜单展示之前就渲染进 DOM',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'inlineCollapsed',
        label: 'inlineCollapsed',
        title: 'inline 时菜单是否收起状态',
        setters: 'BooleanSetter'
      },
      {
        name: 'inlineIndent',
        label: 'inlineIndent',
        title: 'inline 模式的菜单缩进宽度',
        setters: 'NumberSetter',
        defaultValue: 24
      },
      {
        name: 'items',
        label: 'items',
        title: '菜单内容',
        setters: 'ArraySetter' //?? ItemType[]
      },
      {
        name: 'mode',
        label: 'mode',
        title: '菜单类型，现在支持垂直、水平、和内嵌模式三种',
        setters: 'SelectSetter',
        options: ['vertical', 'horizontal', 'inline'],
        defaultValue: 'vertical'
      },
      {
        name: 'multiple',
        label: 'multiple',
        title: '是否允许多选',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'openKeys(v-model)',
        label: 'openKeys(v-model)',
        title: '当前展开的 SubMenu 菜单项 key 数组',
        setters: 'ArraySetter'
      },
      {
        name: 'overflowedIndicator',
        label: 'overflowedIndicator',
        title: '用于自定义 Menu 水平空间不足时的省略收缩的图标'
        // setters: ,    // ?? slot
        // defaultValue: , // ?? 	<EllipsisOutlined />
      },
      {
        name: 'selectable',
        label: 'selectable',
        title: '是否允许选中',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'selectedKeys(v-model)',
        label: 'selectedKeys(v-model)',
        title: '当前选中的菜单项 key 数组',
        setters: 'ArraySetter'
      },
      {
        name: 'subMenuCloseDelay',
        label: 'subMenuCloseDelay',
        title: '用户鼠标离开子菜单后关闭延时，单位：秒',
        setters: 'NumberSetter',
        defaultValue: 0.1
      },
      {
        name: 'subMenuOpenDelay',
        label: 'subMenuOpenDelay',
        title: '用户鼠标进入子菜单后开启延时，单位：秒',
        setters: 'NumberSetter',
        defaultValue: 0
      },
      {
        name: 'theme',
        label: 'theme',
        title: '主题颜色',
        setters: 'SelectSetter',
        options: ['light', 'dark'],
        defaultValue: 'light'
      },
      {
        name: 'triggerSubMenuAction',
        label: 'triggerSubMenuAction',
        title: '修改 Menu 子菜单的触发方式',
        setters: 'SelectSetter',
        options: ['click', 'hover'],
        defaultValue: 'hover'
      }
    ],
    events: ['click', 'deselect', 'openChange', 'select'],
    slots: ['overflowedIndicator']
  },
  {
    name: 'AMenuItem',
    alias: 'MenuItem',
    parent: 'Menu',
    label: '导航菜单项',
    categoryId: 'nav',
    doc: 'https://www.antdv.com/components/menu-cn',
    props: [
      {
        name: 'disabled',
        label: 'disabled',
        title: '是否禁用',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'icon',
        label: 'icon',
        title: '菜单图标'
      },
      {
        name: 'key',
        label: 'key',
        title: 'item 的唯一标志',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'title',
        label: 'title',
        title: '设置收缩时展示的悬浮标题',
        setters: 'StringSetter'
      }
    ],
    slots: ['title']
  },
  {
    name: 'AMenuItemType',
    alias: 'MenuItemType',
    parent: 'MenuItem',
    label: '导航菜单项类型',
    categoryId: 'nav',
    doc: 'https://www.antdv.com/components/menu-cn',
    props: [
      {
        name: 'danger',
        label: 'danger',
        title: '展示错误状态样式',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '是否禁用',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'icon',
        label: 'icon',
        title: '菜单图标',
        setters: 'FunctionSetter'
        //?? 	VueNode|(item: MenuItemType)=>VueNode
      },
      {
        name: 'key',
        label: 'key',
        title: 'item 的唯一标志',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'label',
        label: 'label',
        title: '菜单项标题'
        // setters: '' //?? VueNode
      },
      {
        name: 'title',
        label: 'title',
        title: '设置收缩时展示的悬浮标题',
        setters: ['StringSetter']
      }
    ],
    slots: ['icon', 'label']
  }
];
export default components;
