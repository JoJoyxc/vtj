import {
  BlockSchema,
  Assets,
  ProjectSchema,
  ComponentDescription,
  ApiSchema
} from '../core';
import { compiled, apiCompiled } from './template';
import { parser } from './tokens';
import { tsFormatter, htmlFormatter, cssFormatter } from './formatters';

export interface ICoderOptions {
  pages: BlockSchema[];
  blocks: BlockSchema[];
  apis: ApiSchema[];
  componentMap: Record<string, ComponentDescription>;
}

function vueCoder(
  dsl: BlockSchema,
  componentMap: Record<string, ComponentDescription>
) {
  const tokens = parser(dsl, componentMap);
  const source = compiled(tokens);
  return htmlFormatter(`
  <template>
  ${tokens.template}
  </template>
  <script lang="ts">${tsFormatter(source)}</script>
  <style lang="scss" scoped>${cssFormatter(tokens.css)}</style>
 `);
}

function apiCoder(apis: ApiSchema[] = []) {
  const source = apiCompiled({
    items: apis
  });
  return tsFormatter(source);
}

export function coder(options: ICoderOptions) {
  const { pages = [], blocks = [], componentMap = {}, apis = [] } = options;
  const vuePages = pages.map((file) => {
    return {
      id: file.id as string,
      name: file.name,
      content: vueCoder(file, componentMap)
    };
  });
  const vueBlocks = blocks.map((file) => {
    return {
      id: file.id as string,
      name: file.name,
      content: vueCoder(file, componentMap)
    };
  });
  const tsApis = apiCoder(apis);
  return {
    pages: vuePages,
    blocks: vueBlocks,
    apis: tsApis
  };
}
