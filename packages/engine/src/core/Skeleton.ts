import { reactive, Ref, computed, ComputedRef } from 'vue';
import { Widget, PartialWidget, Region } from './types';
import { merge, isString } from '../utils';
import { buildInWidgets } from '../views';

// IDE区域
export const REGION_LIST: Region[] = [
  'brand',
  'toolbar',
  'action',
  'status',
  'apps',
  'workspace',
  'setting'
];

/**
 * 布局骨架类
 */
export class Skeleton {
  /**
   * 组件配置
   */
  public readonly widgets: Widget[];

  /**
   * 在WidgetRenderer记录组件的实例
   */
  public widgetInstances: Record<string, any> = {};

  /**
   * 组件分组计算属性
   */
  public regions: ComputedRef<Record<Region, Widget[]>>;

  /**
   * 区域组件实例， 在EngineView.vue 写入
   */
  public regionInstances: Record<Region, any> = {} as any;

  constructor(widgets: Widget[]) {
    this.widgets = reactive<Widget[]>(widgets);

    // 初始化计算属性
    this.regions = computed<Record<Region, Widget[]>>(() => {
      return REGION_LIST.reduce((result, name) => {
        result[name] = this.getWidgets(name);
        return result;
      }, {} as Record<Region, Widget[]>);
    });
  }

  /**
   * 加载组件
   * @param widgets
   */
  load(widgets: Widget[]) {
    widgets.forEach((item: Widget) => {
      this.add(item);
    });
  }

  /**
   * 获取组件配置
   * @param name
   * @returns
   */
  get(name: string) {
    return this.widgets.find((n: Widget) => n.name === name);
  }

  /**
   * 更新组件配置
   * @param name
   * @param modify
   */
  set(name: string, modify: PartialWidget) {
    const widget = this.get(name);
    if (widget) {
      merge(widget, modify);
    }
  }

  /**
   * 新增组件，如果组件名称已存在，即修改
   * @param widget
   */
  add(widget: Widget) {
    const exist = !!this.get(widget.name);
    if (exist) {
      this.set(widget.name, widget);
    } else {
      this.widgets.push(widget);
    }
  }

  /**
   * 删除组件
   * @param name
   */
  remove(name: string) {
    const index = this.widgets.findIndex((n: Widget) => n.name === name);
    if (index >= 0) {
      const widget = this.widgets[index];
      widget.disabled = true;
      this.widgets.splice(index, 1);
    }
  }

  /**
   * 根据组件配置的组件类型获取Vue组件定义
   * @param type
   * @returns
   */
  getComponent(type: string | any) {
    if (!type) return buildInWidgets.Empty;
    if (isString(type)) {
      return (buildInWidgets as any)[type] || buildInWidgets.Empty;
    }
    return type;
  }

  /**
   * 获取区域内的组件
   * @param region
   * @returns
   */
  getWidgets(region: string) {
    return this.widgets
      .filter((n: Widget) => n.region === region)
      .sort((a: Widget, b: Widget) => (a.order || 0) - (b.order || 0));
  }

  dispose() {
    this.widgetInstances = {};
    this.regionInstances = {} as any;
  }
}
