import { copy } from '@vtj/cli';

const modules = '../../node_modules/';
const packages = '../';
const dist = 'dist/';
const files = [
  [modules + 'vue/dist/vue.global.prod.js', 'deps/vue/vue.global.prod.js'],
  [
    modules + 'vue-router/dist/vue-router.global.prod.js',
    'deps/vue-router/vue-router.global.prod.js'
  ],
  [
    modules + 'element-plus/dist/index.full.min.js',
    'deps/element-plus/index.full.min.js'
  ],
  [modules + 'element-plus/dist/index.css', 'deps/element-plus/index.css'],
  [modules + 'echarts/dist/echarts.min.js', 'deps/echarts/echarts.min.js'],
  [packages + 'utils/dist/index.umd.js', 'deps/@vtj/utils/index.umd.js'],
  [packages + 'icons/dist/index.umd.js', 'deps/@vtj/icons/index.umd.js'],
  [packages + 'icons/dist/style.css', 'deps/@vtj/icons/style.css'],
  [packages + 'ui/dist/index.umd.js', 'deps/@vtj/ui/index.umd.js'],
  [packages + 'ui/dist/style.css', 'deps/@vtj/ui/style.css']
];

function doCopy() {
  for (const item of files) {
    copy(item[0], dist + item[1]);
  }
}

doCopy();
