import { setupUniApp, install } from '@vtj/uni';
import { createRenderer } from '@vtj/renderer';
import { type BlockSchema } from '@vtj/core';
//@ts-ignore
import * as Vue from '@dcloudio/uni-h5-vue';
//@ts-ignore
import * as UniH5 from '@dcloudio/uni-h5';
import App from './components/UniRoot.vue';

const manifestJson: any = {};

const pagesJson: any = {
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'Global Title'
  }
};

const dsl: BlockSchema = {
  name: 'UniPageDemo',
  nodes: [
    {
      name: 'View',
      children: [
        {
          name: 'Button',
          props: {
            type: 'primary'
          },
          events: {
            click: {
              name: 'click',
              handler: {
                type: 'JSFunction',
                value: `
                ()=>{
                  uni.navigateTo({
                    url: '/pages/2'
                  })
                }
                `
              }
            }
          },
          children: 'Page 1'
        }
      ]
    }
  ],
  lifeCycles: {
    onLoad: {
      type: 'JSFunction',
      value: `
      (opt)=>{
      console.log('onLoad app',opt, uni)
      }
        `
    },
    onShow: {
      type: 'JSFunction',
      value: `
      ()=>{
      console.log('onShow app')
      }
        `
    }
  }
};

const dsl2: BlockSchema = {
  name: 'Page2',
  nodes: [
    {
      name: 'View',
      children: [
        {
          name: 'Button',
          props: {
            type: 'primary'
          },
          events: {
            click: {
              name: 'click',
              handler: {
                type: 'JSFunction',
                value: `
                ()=>{
                  uni.navigateTo({
                    url: '/'
                  })
                }
                `
              }
            }
          },
          children: 'Page 2'
        }
      ]
    }
  ]
};

const { renderer } = createRenderer({ dsl, components: {} });

const { renderer: page2Renderer } = createRenderer({
  dsl: dsl2,
  components: {}
});

const app = setupUniApp({
  Vue,
  App,
  UniH5,
  manifestJson,
  pagesJson,
  routes: [
    {
      path: '/',
      component: renderer,
      style: {
        navigationBarTitleText: 'Page 1'
      }
    },
    {
      path: '/pages/2',
      component: page2Renderer,
      style: {
        navigationBarTitleText: 'Page 2'
      }
    }
  ]
});
app.use(install, UniH5);
app.mount(document.body);
