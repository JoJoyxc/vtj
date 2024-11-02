import { jsonp } from '@vtj/utils';
import { useEngine } from '../../framework';

export interface PublishTemplateDto {
  name: string;
  title: string;
  category: string;
  cover: Blob;
  share: boolean;
  version: string;
  dsl: string;
  id?: string;
}

export function useOpenApi() {
  const engine = useEngine();
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

  const getDictOptions = async (code: string) => {
    const api = `${remote}/api/open/dict/${code}`;
    const res = await jsonp(api);
    return res?.data || [];
  };

  const getTemplateCategories = () => getDictOptions('TemplateCategory');

  const publishTemplate = async (dto: PublishTemplateDto) => {
    const token = access?.getData()?.token;
    const api = `${remote}/api/open/template/publish/${token}`;
    const data = new FormData();
    for (const [name, value] of Object.entries(dto)) {
      if (value !== undefined) {
        data.append(name, value);
      }
    }
    return window
      .fetch(api, {
        method: 'post',
        body: data
      })
      .then((res) => res.json());
  };

  return {
    engine,
    access,
    remote,
    auth,
    toRemoteAuth,
    isLogined,
    getTemplates,
    getTemplateDsl,
    getDictOptions,
    getTemplateCategories,
    publishTemplate
  };
}
