import { join } from 'path';
import fs from 'fs-extra';

const { copySync, existsSync } = fs;

function doCopy(files, toDir) {
  for (let [src, dest] of files) {
    if (existsSync(src)) {
      copySync(src, join(toDir, dest));
    }
  }
  console.log('copy files done!');
}

// const args = process.argv.slice(2);
// const root = args.includes('--example') ? 'example' : 'dev';
// const dir = `${root}/public/libs`;
const files = [
  ['dev/node_modules/@vtj/assets/lib', ''],
  [
    'node_modules/element-plus/dist/index.full.min.js.map',
    'index.full.min.js.map'
  ],
  ['node_modules/lodash/lodash.min.js', 'lodash.min.js'],
  ['node_modules/element-plus/dist/index.css', 'element-plus.index.css'],
  // ['node_modules/echarts/dist/echarts.min.js', 'echarts.min.js'],
  ['dev/node_modules/@vtj/utils/cdn/index.js', 'vtj-utils.js'],
  ['dev/node_modules/@vtj/ui/cdn/index.js', 'vtj-ui.js'],
  ['dev/node_modules/@vtj/ui/cdn/style.css', 'vtj-ui.css'],
  ['dev/node_modules/@vtj/icons/cdn/index.js', 'vtj-icons.js'],
  ['dev/node_modules/@vtj/icons/cdn/style.css', 'vtj-icons.css']
];

doCopy(files, 'dev/public/libs');
doCopy(files, 'packages/ide/public/libs');
