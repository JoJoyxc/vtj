import { type VNode, type DefineComponent } from 'vue';
/**
 * 区域类型
 */
export enum RegionType {
  // 品牌区
  Brand = 'Brand',
  // 工具区
  Toolbar = 'Toolbar',
  // 动作区
  Actions = 'Actions',
  // 应用区
  Apps = 'Apps',
  // 工作区
  Workspace = 'Workspace',
  // 设置区
  Settings = 'Settings',
  // 状态区
  Status = 'Status'
}
/**
 * 基础器件
 */
export interface Widget {
  /**
   * 器件名称
   */
  name: string;
  /**
   * 放置区域
   */
  region: keyof typeof RegionType;
  /**
   * Vue组件
   */
  component: Record<string, any> | VNode | DefineComponent<any, any, any, any>;

  /**
   * 不可见，停用
   */
  invisible?: boolean;
}

/**
 * App类型器件
 */
export interface AppWidget extends Widget {
  /**
   * 标识app
   */
  type: 'app';
  /**
   *  应用图标
   */
  icon: string;
  /**
   * 应用名称
   */
  label?: string;
  /**
   * 应用打开方式
   */
  openType?: 'panel' | 'link' | 'dialog';
}

/**
 * 选项卡类型器件
 */
export interface TabWidget extends Widget {
  /**
   * 标识tab
   */
  type: 'tab';
  /**
   * tab名称
   */
  label: string;
  /**
   * tab图标
   */
  icon?: string;
  /**
   * 能关闭的
   */
  closable?: boolean;
}
