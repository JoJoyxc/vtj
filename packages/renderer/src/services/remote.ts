import {
  Service,
  type ProjectSchema,
  type BlockSchema,
  type HistorySchema,
  type HistoryItem
} from '@vtj/core';
import { Request } from '@vtj/utils';
import { ElNotification } from 'element-plus';

const request = new Request({
  settings: {
    type: 'json',
    validSuccess: true,
    originResponse: false,
    failMessage: true,
    validate: (res: any) => {
      return res.data?.code === 0;
    },
    showError: (msg: string) => {
      ElNotification.error({
        message: msg || '未知错误'
      });
    }
  }
});

const createApi = (url: string) => {
  return (type: string, data: any) => {
    return request.send({
      url,
      method: 'post',
      query: { type },
      data: {
        type,
        data
      }
    });
  };
};

export interface RemoteServiceOptions {
  url?: string;
}

export class RemoteService extends Service {
  private api: (type: string, data: any) => Promise<any>;
  constructor(options: RemoteServiceOptions = {}) {
    super();
    this.api = createApi(options.url || '/vtj/api/${type}.json');
  }
  async init(project: ProjectSchema): Promise<ProjectSchema> {
    const res = await this.api('init', project).catch(() => null);
    return (res || {}) as ProjectSchema;
  }
  async saveProject(project: ProjectSchema): Promise<boolean> {
    const res = await this.api('saveProject', project).catch(() => false);
    return !!res;
  }
  async saveFile(file: BlockSchema): Promise<boolean> {
    const res = await this.api('saveFile', file).catch(() => false);
    return !!res;
  }
  async getFile(id: string): Promise<BlockSchema> {
    const res = await this.api('getFile', id).catch(() => null);
    return (res || {}) as BlockSchema;
  }
  async removeFile(id: string): Promise<boolean> {
    const res = await this.api('removeFile', id).catch(() => false);
    return !!res;
  }
  async saveHistory(history: HistorySchema): Promise<boolean> {
    const res = await this.api('saveHistory', history).catch(() => false);
    return !!res;
  }
  async removeHistory(id: string): Promise<boolean> {
    const res = await this.api('removeHistory', id).catch(() => false);
    return !!res;
  }
  async getHistory(id: string): Promise<HistorySchema> {
    const res = await this.api('getHistory', id).catch(() => null);
    return (res || {}) as HistorySchema;
  }

  async getHistoryItem(fId: string, id: string): Promise<HistoryItem> {
    const res = await this.api('getHistoryItem', { fId, id }).catch(() => null);
    return (res || {}) as HistoryItem;
  }
  async saveHistoryItem(fId: string, item: HistoryItem): Promise<boolean> {
    const res = await this.api('saveHistoryItem', { fId, item }).catch(
      () => false
    );
    return !!res;
  }
  async removeHistoryItem(fId: string, ids: string[]): Promise<boolean> {
    const res = await this.api('removeHistoryItem', { fId, ids }).catch(
      () => false
    );
    return !!res;
  }
}
