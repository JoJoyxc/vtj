import { Widget } from './widget';
import { Dependencie } from './dependencie';
export interface Config {
  // 初始化完成后激活的app名称
  activeApp?: string;

  // 装置配置
  widgets?: Array<Widget>;

  // 依赖包
  dependencies?: Dependencie[];
}
