import type { SetupUniAppOptions } from './types';
import { MANIFEST_JSON, PAGES_JSON } from './defaults';
export function toKebabCase(str: string): string {
  // 将字符串转换为小写
  const lowerCaseStr = str.toLowerCase();

  // 使用正则表达式匹配驼峰命名法的单词边界，并替换为短横线
  return lowerCaseStr.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}

export function mergeOptions(options: SetupUniAppOptions): SetupUniAppOptions {
  let { manifest = {}, tabBar = {}, globalStyle = {} } = options;

  return {
    ...options,
    manifest: Object.assign({}, MANIFEST_JSON, manifest),
    tabBar: Object.assign({}, (PAGES_JSON as any).tabBar || {}, tabBar),
    globalStyle: Object.assign(
      {},
      (PAGES_JSON as any).globalStyle || {},
      globalStyle
    )
  };
}
