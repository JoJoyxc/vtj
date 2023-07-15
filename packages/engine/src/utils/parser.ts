import type { JSExpression, JSFunction } from '../core';
import { ElNotification } from 'element-plus';
export function parseExpression(
  str: JSExpression | JSFunction,
  self: any,
  thisRequired = false,
  throwError = false
) {
  try {
    const contextArr = ['"use strict";', 'var __self = arguments[0];'];
    contextArr.push('return ');
    let tarStr: string = (str.value || '').trim();
    tarStr = tarStr.replace(/this(\W|$)/g, (_a: any, b: any) => `__self${b}`);
    tarStr = contextArr.join('\n') + tarStr;
    const code = `with(${thisRequired ? '{}' : '$scope || {}'}) { ${tarStr} }`;
    return new Function('$scope', code)(self);
  } catch (err: any) {
    console.error('parseExpression.error', err, str, self?.__self ?? self);
    if (throwError) {
      throw err;
    }
  }
}

export function parseFunction(
  str: JSFunction,
  self: any,
  thisRequired = false,
  throwError = false
) {
  const fn = parseExpression(str, self, thisRequired, throwError);
  if (typeof fn !== 'function') {
    console.error(
      'parseFunction.error',
      'not a function',
      str,
      self?.__self ?? self
    );
    if (throwError) {
      throw new Error(`"${str.value}" not a function`);
    }
  }
  return fn as Function;
}

export function expressionValidate(
  str: JSExpression | JSFunction,
  self: any,
  thisRequired = false
) {
  let vaild = true;
  try {
    if (str.type === 'JSExpression') {
      parseExpression(str, self, thisRequired, true);
    } else {
      parseFunction(str, self, thisRequired, true);
    }
  } catch (e: any) {
    vaild = false;
    ElNotification.error({
      title: '代码错误',
      message: e.message
    });
  }
  return vaild;
}
