import pkg from 'fs-extra';
import { resolve } from 'path';
const { readdirSync } = pkg;

const dir = resolve('node_modules/@dcloudio/uni-h5/style');
const files = readdirSync(dir);
const result = [];
for (const item of files) {
  if (item.includes('.css')) {
    result.push(`@use '@dcloudio/uni-h5/style/${item}';`);
  } else {
    const subFiles = readdirSync(dir + '/' + item);
    for (const file of subFiles) {
      result.push(`@use '@dcloudio/uni-h5/style/${item}/${file}';`);
    }
  }
}

console.log(result.join('\n'));
