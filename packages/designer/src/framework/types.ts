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
 * 器件
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
}
