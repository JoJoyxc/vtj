import { logger, type BlockPropDataType } from '@vtj/core';
import { merge } from '@vtj/utils';
import { builtInSetters } from './built-in';
import { type SetterConfig } from '../framework';

class SetterManager {
  private setters: Record<string, SetterConfig> = {};
  constructor() {
    this.setters = this.createSetters();
  }
  private createSetters() {
    const setters: Record<string, SetterConfig> = {};
    for (const item of builtInSetters) {
      setters[item.name] = item;
    }
    return setters;
  }

  /**
   * 注册一个设置器
   * @param widget
   */
  register(setter: SetterConfig) {
    this.setters[setter.name] = setter;
  }

  /**
   * 根据名称获取设置器
   * @param name
   * @returns
   */
  get(name: string) {
    return this.setters[name];
  }

  /**
   * 修改设置器
   * @param name
   * @param widget
   * @returns
   */
  set(name: string, setter: Partial<SetterConfig>) {
    const match = this.setters[name];
    if (!match) {
      logger.warn(`setter '${name}' is not found`);
      return;
    }
    merge(match, setter);
    if (setter.component) {
      match.component = setter.component;
    }
  }

  getByType(type: BlockPropDataType) {
    const setters = Object.values(this.setters);
    return setters.filter((n) => n.dataType === type).map((n) => n.name);
  }
}

export const setterManager = new SetterManager();
