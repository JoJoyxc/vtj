import numeral from 'numeral';

export function numberFormat(value: number, format: string) {
  return numeral(value).format(format);
}

/**
 * 保留小数点，默认2位
 * @param value  数值
 * @param number 小数位数
 * @param round 是否四舍五入
 * @returns
 */
export function toFixed(value: number, number = 2, round: boolean) {
  const method = round ? Math.round : Math.floor;
  return method(Math.pow(10, number) * value) / Math.pow(10, number);
}

export { numeral };
