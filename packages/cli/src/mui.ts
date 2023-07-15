import fs from 'fs-extra';
import { resolve, join } from 'path';

function copyDir(from: string, to: string) {
  fs.removeSync(to);
  fs.copySync(from, to);
}

export function mui() {
  const MUI_PATH = resolve('node_modules/@newpearl/lcdp-mui');
  const UNI_MODULES_PATH = resolve('src/uni_modules');
  if (fs.existsSync(MUI_PATH)) {
    copyDir(join(MUI_PATH, 'lib/uni-ui'), join(UNI_MODULES_PATH, 'uni-ui'));
    copyDir(join(MUI_PATH, 'lib/x-mui'), join(UNI_MODULES_PATH, 'x-mui'));
    console.log('done:', 'mui 安装完成！');
  } else {
    console.log('error:', '@newpearl/lcdp-mui 未安装！');
  }
}
