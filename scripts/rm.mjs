import { rm } from 'fs/promises';
import { resolve } from 'path';
const dir = process.argv[2];

if (dir) {
  rm(resolve(dir), { recursive: true, force: true });
}
