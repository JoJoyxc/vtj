import { transformFileSync } from '@babel/core';
import { minify } from 'terser';
import fs from 'fs-extra';

export interface ITransformOptions {
  targets?: string[];
  modules?: boolean;
  minify?: boolean;
}

export async function transform(
  input: string,
  output: string,
  options: ITransformOptions = {}
) {
  const { targets = ['chrome > 40'], modules = false } = options || {};
  const res = transformFileSync(input, {
    presets: [['@babel/preset-env', { targets, modules }]]
  });
  if (options.minify) {
    const { code } = await minify(res?.code || '', { sourceMap: false });
    if (code) {
      fs.writeFileSync(output, code);
    }
  } else {
    fs.writeFileSync(output, res?.code || '');
  }
}
