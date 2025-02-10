import type { UniConfig } from '@vtj/core';
import { parseSFC, parseScript, traverseAST, generateCode } from '../shared';

export function parseUniApp(source: string) {
  const sfc = parseSFC(source);
  const ast = parseScript(sfc.script);
  const uniConfig: UniConfig = {};
  traverseAST(ast, {
    CallExpression(path) {
      const calleeName = (path.node.callee as any)?.name;
      if (calleeName) {
        const code = generateCode(path.node.arguments[0]);
        uniConfig[calleeName as keyof UniConfig] = {
          type: 'JSFunction',
          value: code
        };
      }
    }
  });
  return uniConfig;
}
