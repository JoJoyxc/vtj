import { resolve } from 'node:path';
import fs from 'fs-extra';

const SRC_PATH = resolve('packages/mui/src/uni_modules');
const LIB_PATH = resolve('packages/mui/lib');
if (fs.existsSync(SRC_PATH)) {
  fs.removeSync(LIB_PATH);
  fs.copySync(SRC_PATH, LIB_PATH);
  console.log('done:', '@newpearl/lcdp-mui 编译完成!');
}
