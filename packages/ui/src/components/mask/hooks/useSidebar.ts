import { ref } from 'vue';
import { MaskProps } from '../types';

export function useSidebar(props: MaskProps) {
  // 侧边栏折叠
  const collapsed = ref<boolean>(false);
  // 菜单搜索关键字
  const keyword = ref<string>('');
  // 收藏菜单
  const favorite = ref<boolean>(false);
  return {
    collapsed,
    keyword,
    favorite
  };
}