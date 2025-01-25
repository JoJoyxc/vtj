import { setupUniApp, View, install } from '@vtj/uni';
import { createRenderer } from '@vtj/renderer';
import { type BlockSchema } from '@vtj/core';
import App from './components/UniRoot.vue';

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
          children: 'ButtonText'
        }
      ]
    }
  ],
  lifeCycles: {
    onLoad: {
      type: 'JSFunction',
      value: `
      (opt)=>{
      console.log('onLoad app',opt)
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

const { renderer } = createRenderer({ dsl, components: { View } });

const app = setupUniApp({
  App,
  routes: [
    {
      path: '/',
      component: renderer
    }
  ]
});
app.use(install);
app.mount(document.body);
