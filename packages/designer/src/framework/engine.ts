import { createApp, type MaybeRef, onMounted, unref } from 'vue';
import App from '../components/app.vue';

export class Engine {
  constructor(public container: MaybeRef<HTMLElement | undefined>) {
    onMounted(() => {
      this.render();
    });
  }
  render() {
    const container = unref(this.container);
    if (container) {
      const app = createApp(App);
      app.mount(container);
    }
  }
}
