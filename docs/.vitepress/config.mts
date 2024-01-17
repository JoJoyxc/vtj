import { defineConfig } from 'vitepress';
import {
  containerPreview,
  componentPreview
} from '@vitepress-demo-preview/plugin';

const gitee = `<svg t="1705367265025" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4208" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23" p-id="4209"></path></svg>`;

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'VTJ.PRO',
  description: 'VTJ 是一款基于 Vue3 + Typescript 的低代码开发工具.',
  srcDir: 'src',
  cacheDir: './cache',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Vue.js', link: 'https://cn.vuejs.org/api/' },
      { text: 'Element Plus', link: 'https://element-plus.org/zh-CN/' },
      {
        text: 'Ant Design Vue',
        link: 'https://www.antdv.com/components/overview-cn/'
      }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: { svg: gitee }, link: 'https://gitee.com/newgateway/vtj' }
    ]
  },
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    }
  },
  outDir: './dist'
});
