import { expect, test } from 'vitest';
import {
  isString,
  isSymbol,
  camelCase,
  upperFirst,
  slice,
  words,
  get
} from '../src';

test('isString', () => {
  expect(isString('abc')).toBe(true);
  expect(isString(null)).toBe(false);
  expect(isString(0)).toBe(false);
});

test('isSymbol', () => {
  expect(isSymbol(Symbol('test'))).toBe(true);
  expect(isSymbol(null)).toBe(false);
});

test('camelCase', () => {
  expect(camelCase('hello-world')).equal('helloWorld');
  expect(camelCase('hello world')).equal('helloWorld');
});

test('upperFirst', () => {
  expect(upperFirst('helloWorld')).equal('HelloWorld');
});

test('slice', () => {
  expect(slice([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  expect(slice([1, 2, 3, 4], 3)).toEqual([4]);
  expect(slice([1, 2, 3, 4], 1, 3)).toEqual([2, 3]);
});

test('words', () => {
  expect(words('hello world! ok')).toEqual(['hello', 'world', 'ok']);
});

test('get', () => {
  const obj = {
    a: 1,
    b: { c: 2 },
    c: [1, 2, 3],
    d: [{ a: 3 }]
  };

  expect(get(obj, 'a')).toBe(1);
  expect(get(obj, 'b.c')).toBe(2);
  expect(get(obj, 'c.2')).toBe(3);
  expect(get(obj, 'd.0.a')).toBe(3);
  expect(get(obj, 'e', null)).toBe(null);
});
