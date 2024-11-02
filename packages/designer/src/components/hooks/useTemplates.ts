import { computed, ref, type Ref } from 'vue';
import { groupBy } from '@vtj/utils';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useOpenApi } from './useOpenApi';

export interface TemplateDto {
  id: string;
  name: string;
  title: string;
  vip: boolean;
  share: boolean;
  cover: string;
  author: string;
  category: string;
}

export function useTemplates() {
  const {
    engine,
    access,
    toRemoteAuth,
    isLogined,
    getTemplates,
    getTemplateDsl
  } = useOpenApi();

  const templates: Ref<TemplateDto[]> = ref([]);

  const installTemplate = async (templateId: string) => {
    const dsl = await getTemplateDsl(templateId);
    if (!dsl) {
      return await ElMessageBox.alert('模板不可用，可能该模板没发布过版本', {
        type: 'error',
        title: '提示'
      });
    }
    if (!engine.current.value) {
      ElMessage.warning({
        message: '设计区无文件，请先打开页面或区块'
      });
      return;
    }
    const old = engine.current.value.toDsl();
    const { id, name } = old;
    engine.current.value.update({ ...dsl, id, name });
    ElMessage.success({
      message: '模板已加载完成'
    });
  };

  const groups = computed(() => {
    const userId = access?.getData()?.id;
    return groupBy(templates.value, (template) => {
      return template.author === userId ? '我的' : template.category;
    });
  });

  getTemplates().then((res) => {
    templates.value = res;
  });

  return {
    engine,
    templates,
    toRemoteAuth,
    isLogined,
    getTemplates,
    getTemplateDsl,
    installTemplate,
    groups,
    access
  };
}
