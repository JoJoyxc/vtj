import { registerCell } from './cell';
import { registerFilter } from './filter';
import { registerEdit } from './edit';

let __registered = false;
// 确保只注册一次
if (!__registered) {
  __registered = true;
  registerCell();
  registerFilter();
  registerEdit();
}
