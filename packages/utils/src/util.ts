import { upperFirst, camelCase } from 'lodash-es';
export {
  get,
  set,
  isPlainObject,
  cloneDeep,
  merge,
  debounce,
  throttle,
  isEqual,
  template,
  lowerFirst,
  kebabCase
} from 'lodash-es';

export { upperFirst, camelCase };

export function uid() {
  return Number(Math.random().toString().substring(2, 5) + Date.now()).toString(
    36
  );
}

export function uuid(split = true) {
  const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );
  return split ? id.toLowerCase() : id.replace(/-/gi, '');
}

export function isFunction(val: any): boolean {
  return typeof val === 'function';
}

export function upperFirstCamelCase(name: string) {
  return upperFirst(camelCase(name));
}

/**
 * 提取对象属性
 * @param object
 * @param filter
 * @returns
 */
export function pick(
  object: Record<string, any>,
  filter?: (v: any) => boolean
) {
  const obj: Record<string, any> = Object.create(null);
  const match = filter || ((v) => v !== null && v !== undefined);
  Object.entries(object).forEach(([n, v]) => {
    if (match(v)) {
      obj[n] = v;
    }
  });
  return obj;
}

/**
 * 递归对象或数组清除文本类型值的两边空格
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
export function trim(obj: any): any {
  const type = typeof obj;
  if (type === 'string') {
    return obj.trim();
  }
  if (Array.isArray(obj)) {
    return obj.map((n: any) => trim(n));
  }
  if (obj && type === 'object') {
    Object.entries(obj).forEach(([k, v]) => {
      obj[k] = trim(v);
    });
    return obj;
  }
  return obj;
}

/**
 * 截取几位小数
 */
export function toFixed(value: number, number = 2, round: boolean) {
  const method = round ? Math.round : Math.floor;
  return method(Math.pow(10, number) * value) / Math.pow(10, number);
}

export async function delay(val: number = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, val);
  });
}
