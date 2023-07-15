import { describe, it, expect } from 'vitest';
import { upperFirstCamelCase } from '../src';

describe('util', () => {
  it('upperFirstCamelCase', () => {
    expect(upperFirstCamelCase('hello-world')).toBe('HelloWorld');
  });
});
