/// <reference types="vite/client" />
const modules = import.meta.glob(['/.vtj/project/*.json', '/.vtj/file/*.json']);
export default {
  modules,
  service: 'file',
  raw: false,
  isProd: process.env.NODE_ENV === 'production',
  project: {
    id: 'ide',
    name: '项目样例',
    base: './',
    mode: 'hash',
    page: '/page',
    preview: '/preview',
    home: '/dashboard'
  },
  ide: { path: '/ide/' }
};
