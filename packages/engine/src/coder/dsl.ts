import { BlockSchema } from '../core';
import { compiled } from './template';

import { schemaParser } from './parser';
import { tsFormatter, htmlFormatter, cssFormatter } from './formatters';

export interface IDslOptions {
  ts?: boolean;
  scss?: boolean;
  scoped?: boolean;
}

export function dsl(schema: BlockSchema, options?: IDslOptions) {
  const opts = {
    ts: true,
    scss: true,
    scoped: true,
    ...options
  };
  const tokens = schemaParser(schema);
  const source = compiled(tokens);
  const template = htmlFormatter(tokens.template);
  const css = cssFormatter(tokens.css);
  const script = tsFormatter(source);

  const scriptLang = opts.ts ? 'lang="ts"' : '';
  const styleLang = opts.scss ? 'lang="scss"' : 'lang="css"';
  const styleScoped = opts.scoped ? 'scoped' : '';
  const vue = htmlFormatter(`
   <template>
   ${template}
   </template>
   <script ${scriptLang} setup>${script}</script>
   <style ${styleLang} ${styleScoped}>${css}</style>
  `);

  console.log(vue);
}
