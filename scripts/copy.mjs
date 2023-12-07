import { join } from 'path';
import fs from 'fs-extra';

const { copySync, existsSync } = fs;

const from = 'packages/materials/dist';
const to = 'dev/public/@vtj';

if (existsSync(from)) {
  copySync(from, to);
}
