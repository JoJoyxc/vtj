import type { PageFile, BlockFile } from './file';
import type { Dependencie } from '../assets';
import type { ApiSchema, MetaSchema } from './dataSource';
import type { PlatformType } from '../shared';

/**
 * 项目描述信息
 */
export interface ProjectSchema {
  /**
   * 平台，默认 web
   */
  platform?: PlatformType;

  /**
   * 唯一标识
   */
  id?: string;

  /**
   * 项目名称，默认取package.json  name 字段
   */
  name: string;

  /**
   * 项目简介
   */
  description?: string;

  /**
   * 项目页面
   */
  pages?: PageFile[];

  /**
   * 项目共用区块组件
   */
  blocks?: BlockFile[];

  /**
   * 首页 pageId
   */
  homepage?: string;

  /**
   * 项目依赖
   */
  dependencies?: Dependencie[];

  /**
   * api
   */
  apis?: ApiSchema[];

  /**
   * 配置化查询
   */
  meta?: MetaSchema[];

  /**
   * 项目配置
   */

  config?: ProjectConfig;

  /**
   * 标记
   */
  __VTJ_PROJECT__?: boolean;

  /**
   * 版本
   */
  __VERSION__?: string;

  /**
   * 项目部署目录
   */
  __BASE_PATH__?: string;
}

/**
 * 项目配置信息
 */
export interface ProjectConfig {
  /**
   * 开启主题切换
   */
  themeSwitchable?: boolean;

  /**
   * 站点标题
   */
  title?: string;

  /**
   * logo
   */
  logo?: string;
}
