#!/usr/bin/env node

import { boot, mui, rm } from '../lib/index.mjs';

const type = process.argv[2];

if (type) {
  switch (type) {
    case 'mui':
      mui();
      break;
    case 'rm':
      const target = process.argv[3];
      if (target) {
        rm(target);
      }
      break;
  }
} else {
  console.log('缺少操作命令类型');
}
