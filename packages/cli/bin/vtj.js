#!/usr/bin/env node

import { rm } from '../dist/index.mjs';

const type = process.argv[2];

if (type) {
  switch (type) {
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
