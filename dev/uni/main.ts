import { setupUniApp, View, install } from '@vtj/uni';
import { createRenderer, type BlockSchema } from '@vtj/pro';
import App from './components/UniRoot.vue';

const dsl: BlockSchema = {
  name: 'UniPageDemo',
  nodes: [
    {
      name: 'View',
      children: 'ViewText'
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
