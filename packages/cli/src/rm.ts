import fs from 'fs-extra';
import { resolve } from 'path';

export function rm(path: string) {
  const target = resolve(path);
  fs.removeSync(target);
}
