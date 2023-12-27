/**
 * import { widgets } from '../components';
 * 在vitest环境 这样写法引用不到 widgets，未知原因，可能是 vitest 的bug
 */
import { widgets } from '../../components/widgets';
import {
  WidgetGroup,
  type Widget,
  type AppWidget,
  type TabWidget
} from '../../framework';
import {
  VtjIconDocument,
  VtjIconComponents,
  VtjIconBlock,
  VtjIconOutline,
  VtjIconHistory,
  VtjIconApi,
  VtjIconCategory,
  VtjIconInfo
} from '@vtj/icons';

export const builtInWidgets: Array<AppWidget | TabWidget | Widget> = [
  {
    name: 'Logo',
    region: 'Brand',
    component: widgets.Logo
  },
  {
    name: 'Switcher',
    region: 'Brand',
    component: widgets.Switcher
  },
  {
    name: 'Toolbar',
    region: 'Toolbar',
    component: widgets.Toolbar
  },
  {
    name: 'Actions',
    region: 'Actions',
    component: widgets.Actions
  },
  {
    name: 'Pages',
    region: 'Apps',
    component: widgets.Pages,
    type: 'app',
    openType: 'panel',
    icon: VtjIconDocument,
    label: '页面管理'
  },
  {
    name: 'Blocks',
    region: 'Apps',
    component: widgets.Blocks,
    type: 'app',
    openType: 'panel',
    icon: VtjIconComponents,
    label: '区块管理'
  },
  {
    name: 'Components',
    region: 'Apps',
    component: widgets.Components,
    type: 'app',
    openType: 'panel',
    icon: VtjIconBlock,
    label: '组件库'
  },
  {
    name: 'Outline',
    region: 'Apps',
    component: widgets.Outline,
    type: 'app',
    openType: 'panel',
    icon: VtjIconOutline,
    label: '大纲树'
  },
  {
    name: 'History',
    region: 'Apps',
    component: widgets.History,
    type: 'app',
    openType: 'panel',
    icon: VtjIconHistory,
    label: '历史记录'
  },
  {
    name: 'Apis',
    region: 'Apps',
    component: widgets.Apis,
    type: 'app',
    openType: 'panel',
    icon: VtjIconApi,
    label: 'API管理'
  },
  {
    name: 'Deps',
    region: 'Apps',
    component: widgets.Deps,
    type: 'app',
    openType: 'panel',
    icon: VtjIconCategory,
    label: '依赖管理'
  },
  {
    name: 'About',
    region: 'Apps',
    component: widgets.EmptyWidget,
    type: 'app',
    openType: 'dialog',
    icon: VtjIconInfo,
    label: '关于'
  },
  {
    name: 'Designer',
    region: 'Workspace',
    component: widgets.Designer,
    type: 'tab',
    closable: false,
    label: '设计视图'
  },
  {
    name: 'Schema',
    region: 'Workspace',
    component: widgets.EmptyWidget,
    type: 'tab',
    closable: true,
    label: 'Schema'
  },
  {
    name: 'Docs',
    region: 'Workspace',
    component: widgets.EmptyWidget,
    type: 'tab',
    closable: true,
    label: '帮助中心'
  },
  {
    name: 'Scripts',
    region: 'Settings',
    component: widgets.Scripts,
    type: 'tab',
    group: WidgetGroup.Block,
    label: '设置'
  },
  {
    name: 'Css',
    region: 'Settings',
    component: widgets.Css,
    type: 'tab',
    group: WidgetGroup.Block,
    label: 'CSS'
  },
  {
    name: 'DataSources',
    region: 'Settings',
    component: widgets.EmptyWidget,
    type: 'tab',
    group: WidgetGroup.Block,
    label: '数据源'
  },
  {
    name: 'Advanced',
    region: 'Settings',
    component: widgets.EmptyWidget,
    type: 'tab',
    group: WidgetGroup.Block,
    label: '定义'
  },
  {
    name: 'Properties',
    region: 'Settings',
    component: widgets.Properties,
    type: 'tab',
    group: WidgetGroup.Node,
    label: '属性'
  },
  {
    name: 'Style',
    region: 'Settings',
    component: widgets.EmptyWidget,
    type: 'tab',
    group: WidgetGroup.Node,
    label: '样式'
  },
  {
    name: 'Events',
    region: 'Settings',
    component: widgets.Events,
    type: 'tab',
    group: WidgetGroup.Node,
    label: '事件'
  },
  {
    name: 'Directives',
    region: 'Settings',
    component: widgets.Directives,
    type: 'tab',
    group: WidgetGroup.Node,
    label: '指令'
  }
];