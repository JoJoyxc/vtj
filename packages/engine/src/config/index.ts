import { merge } from '../utils';
import { Config, Widget } from '../core';
import { brand } from './brand';
import { toolbar } from './toolbar';
import { action } from './action';
import { apps } from './apps';
import { dependencies } from './dependencies';
import { workspace } from './workspace';
import { setting } from './setting';
import { status } from './status';

export const presetConfig: Config = {
  // 初始启动app
  activeApp: 'pages',
  widgets: [
    ...brand,
    ...toolbar,
    ...action,
    ...apps,
    ...workspace,
    ...setting,
    ...status
  ],
  dependencies
};

function mergeWidgets(target: Widget[], source: Widget[]): Widget[] {
  const currentWidgets = target.slice(0);
  source.forEach((widget) => {
    const index = currentWidgets.findIndex((n) => n.name === widget.name);
    if (index > -1) {
      currentWidgets.splice(index, 1, merge(currentWidgets[index], widget));
    } else {
      currentWidgets.push(widget);
    }
  });
  return currentWidgets;
}

// 合并配置
export function mergeConfig(target: Config, source?: Config): Config {
  const widgets = mergeWidgets(target.widgets || [], source?.widgets || []);
  return Object.assign({}, target, source || {}, { widgets });
}
