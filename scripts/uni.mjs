import { resolve, join } from 'node:path';
import fs from 'fs-extra';

const UNI_MODULES_PATH = resolve('packages/mui/src/uni_modules');
const UNI_UI_PATH = resolve('node_modules/@dcloudio/uni-ui');
const UNI_UI_PACKAGE = join(UNI_UI_PATH, 'package.json');

function updateVersion(version) {
  const file = join(UNI_MODULES_PATH, 'uni-ui/package.json');
  const json = fs.readJsonSync(file, 'utf-8');
  json.version = version;
  fs.writeFileSync(file, JSON.stringify(json, null, 2));
}

function copyComponents() {
  const dir = join(UNI_UI_PATH, 'lib');
  const toDir = join(UNI_MODULES_PATH, 'uni-ui/components');
  fs.removeSync(toDir);
  fs.copySync(dir, toDir);
}

if (fs.existsSync(UNI_UI_PACKAGE)) {
  const pkg = fs.readJsonSync(UNI_UI_PACKAGE, 'utf-8');
  const version = pkg.version;
  copyComponents();
  updateVersion(version);
  console.log('done:', 'uni-ui初始化完成！');
} else {
  console.log('error:', '@dcloudio/uni-ui 未安装！');
}
