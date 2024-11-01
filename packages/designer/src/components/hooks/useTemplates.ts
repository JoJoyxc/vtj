import { ref, type Ref } from 'vue';
import {} from 'vue-router';
import { jsonp } from '@vtj/utils';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useEngine } from '../../framework';

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
  const engine = useEngine();

  const templates: Ref<TemplateDto[]> = ref([]);
  const { access, remote, auth = '#/auth' } = engine.adapter || {};

  const toRemoteAuth = () => {
    if (remote) {
      const { protocol, host, pathname } = location;
      const clientUrl = `${protocol}//${host}${pathname}${auth}`;
      const redirectUrl =
        clientUrl +
        '?redirect=' +
        encodeURIComponent(location.hash.substring(1));
      location.href = `${remote}/auth/client.html?url=${encodeURIComponent(redirectUrl)}`;
    }
  };

  const isLogined = async () => {
    const token = access?.getData()?.token;
    if (token) {
      const api = `${remote}/api/open/logined/${token}`;
      const res = await jsonp(api).catch(() => null);
      if (res && res.data) {
        return true;
      }
      return false;
    }
    return false;
  };

  const getTemplates = async () => {
    const api = `${remote}/api/open/templates`;
    const token = access?.getData()?.token;
    const res = await jsonp(api, { query: { token } });
    return res?.data || [];
  };

  const getTemplateDsl = async (id: string) => {
    const token = access?.getData()?.token;
    const api = `${remote}/api/open/dsl/${token}`;
    const res = await jsonp(api, { query: { id } });
    return res?.data || null;
  };

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
    installTemplate
  };
}
