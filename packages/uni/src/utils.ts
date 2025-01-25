export function toKebabCase(str: string): string {
  // 将字符串转换为小写
  const lowerCaseStr = str.toLowerCase();

  // 使用正则表达式匹配驼峰命名法的单词边界，并替换为短横线
  return lowerCaseStr.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}
