import type { JSExpression, JSFunction } from '../protocols';
import { logger } from './logger';

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
    logger.error('parseExpression.error', err, str, self?.__self ?? self);
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
    logger.error(
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