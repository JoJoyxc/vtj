import { describe, expect, it } from 'vitest';
import { helloWorld } from '../src';

describe('person', () => {
  it('helloWorld', () => {
    expect(helloWorld()).toContain('HelloWorld');
  });
});
