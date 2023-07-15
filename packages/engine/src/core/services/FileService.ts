import { Service } from './Service';
import { createApi } from '@vtj/utils';
import { ElNotification } from 'element-plus';
import {
  ProjectSchema,
  BlockSchema,
  HistoryScheam,
  HistoryItemSchema
} from '../types';

const api = createApi({
  url: '/vtj/base.json',
  method: 'post',
  settings: {
    type: 'json',
    validSuccess: true,
    originResponse: false,
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

export class FileService extends Service {
  public async getProject(project: ProjectSchema): Promise<ProjectSchema> {
    const id = project.id;
    const scheam = await api({ type: 'getProject', data: id }).catch(
      (e) => null
    );
    return scheam || (await this.createProject(project));
  }

  public async createProject(project: ProjectSchema): Promise<ProjectSchema> {
    const id = project.id;
    const name = project.name || '未命名项目';
    const schema: ProjectSchema = {
      ...project,
      id,
      name
    };
    await api({ type: 'createProject', data: schema }).catch((e) => null);
    return schema;
  }

  public async updateProject(project: ProjectSchema): Promise<boolean> {
    if (!project.id) return false;
    const schema = await this.getProject(project);
    const newSchema = Object.assign(schema, project);
    return !!this.createProject(newSchema);
  }

  public async createFile(file: BlockSchema): Promise<BlockSchema> {
    const id = file.id;
    const schema: BlockSchema = {
      ...file,
      id
    };
    await api({ type: 'createFile', data: schema });
    return schema;
  }

  public async updateFile(file: BlockSchema): Promise<boolean> {
    if (!file.id) return false;
    return !!this.createFile(file);
  }

  public async getFile(id: string): Promise<BlockSchema> {
    return await api({ type: 'getFile', data: id }).catch((e) => null);
  }

  public async removeFile(id: string): Promise<boolean> {
    await api({ type: 'removeHistory', data: id });
    await api({ type: 'removeFile', data: id });
    return true;
  }

  public async saveHistory(history: HistoryScheam): Promise<boolean> {
    const { blockId, items } = history;
    await api({ type: 'saveHistory', data: { blockId, items } });
    return true;
  }

  public async getHistory(blockId: string): Promise<HistoryItemSchema[]> {
    return await api({ type: 'getHistory', data: blockId }).catch((e) => []);
  }
}
