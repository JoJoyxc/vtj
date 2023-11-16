import { expect, test } from 'vitest';
import { install } from '../src';
test('install', () => {
  expect(typeof install).toBe('function');
});
