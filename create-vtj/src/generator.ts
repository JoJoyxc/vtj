import { join } from 'path';
import { copySync, readJsonSync, writeJsonSync } from '@vtj/node';
export interface IGeneratorOptions {
  root: string;
  template: string;
  name: string;
}

export function createLibrary(options: IGeneratorOptions) {
  copySync(options.template, options.root);
  const pkg = readJsonSync(join(options.root, 'package.json'));
  pkg.name = options.name;
  writeJsonSync(join(options.root, 'package.json'), pkg, { spaces: 2 });
}

export function createApp(options: IGeneratorOptions) {
  copySync(options.template, options.root);
  const pkg = readJsonSync(join(options.root, 'package.json'));
  pkg.name = options.name;
  writeJsonSync(join(options.root, 'package.json'), pkg, { spaces: 2 });
}
