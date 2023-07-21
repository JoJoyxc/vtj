import { BlockSchema, Assets } from '../core';
import { compiled } from './template';
import { parser } from './tokens';
import { tsFormatter, htmlFormatter, cssFormatter } from './formatters';

export function coder(dsl: BlockSchema, assets: Assets) {
  const tokens = parser(dsl, assets);
  const source = compiled(tokens);
  return htmlFormatter(`
  <template>
  ${tokens.template}
  </template>
  <script lang="ts">${tsFormatter(source)}</script>
  <style lang="scss" scoped>${cssFormatter(tokens.css)}</style>
 `);
}

export function vueCoder() {}

export function routeCoder() {}

export function apiCoder() {}
