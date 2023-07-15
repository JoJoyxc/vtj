import { getCurrentInstance } from 'vue';
import { Provider } from '../Provider';
export function useProvider(): Provider | undefined {
  const instance = getCurrentInstance();
  return instance?.appContext.app.config.globalProperties.$provider;
}
