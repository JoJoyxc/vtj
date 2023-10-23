import { upperFirst, camelCase } from 'lodash-es';
export {
  isString,
  isFunction,
  isArray,
  isObject,
  isBoolean,
  isBuffer,
  isArrayBuffer,
  isObjectLike,
  isArrayLike,
  isDate,
  isUndefined,
  isNaN,
  isNull,
  isNumber,
  isSymbol,
  isPlainObject,
  noop,
  upperFirst,
  camelCase,
  get,
  set,
  cloneDeep,
  merge,
  debounce,
  throttle,
  isEqual,
  template,
  lowerFirst,
  kebabCase
} from 'lodash-es';

export function upperFirstCamelCase(name: string) {
  return upperFirst(camelCase(name));
}
