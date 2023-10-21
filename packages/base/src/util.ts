import upperFirst from 'lodash-es/upperFirst';
import camelCase from 'lodash-es/camelCase';
import get from 'lodash-es/get';
import set from 'lodash-es/set';
import isPlainObject from 'lodash-es/isPlainObject';
import cloneDeep from 'lodash-es/cloneDeep';
import merge from 'lodash-es/merge';
import debounce from 'lodash-es/debounce';
import throttle from 'lodash-es/throttle';
import isEqual from 'lodash-es/isEqual';
import template from 'lodash-es/template';
import lowerFirst from 'lodash-es/lowerFirst';
import kebabCase from 'lodash-es/kebabCase';

export {
  upperFirst,
  camelCase,
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
};

export function upperFirstCamelCase(name: string) {
  return upperFirst(camelCase(name));
}
