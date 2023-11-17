import { expect, test } from 'vitest';
import { emitter, parseExpression, JSExpression } from '../src';

test('emitter', () => {
  emitter.on('test1', (msg) => {
    expect(msg).toBe('hello1');
  });
  emitter.emit('test1', 'hello1');
});

test('parseExpression', () => {
  const exp1: JSExpression = {
    type: 'JSExpression',
    value: '123'
  };
  expect(parseExpression(exp1, this)).toEqual(123);
});
