import { Region, VueComponent } from './shared';

// 装置触发器配置
export interface WidgetTrigger {
  // 图标
  icon?: string;
  // 文本
  label?: string;
  // 打开方式
  type?: 'panel' | 'link' | 'dialog' | 'tab';
  // tab 能否关闭
  closable?: boolean;
}

// 装置配置
export interface Widget {
  // 名称标识
  name: string;
  // 组件名
  type?: string | VueComponent;
  // 区域
  region?: Region;
  // 组件参数
  props?: Record<string, any>;
  // 禁用
  disabled?: boolean;
  // 排序
  order?: number;
  // 触发器
  trigger?: WidgetTrigger;
  // 分组名称
  group?: string;
}

// 属性全部可选，用在修改情况
export type PartialWidget = Partial<Widget>;

// 区域内装置
export type RegionWidgets = Record<Region, Widget[]>;
