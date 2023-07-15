import { Service } from './Service';
import {
  ProjectSchema,
  BlockSchema,
  HistoryScheam,
  HistoryItemSchema
} from '../types';
import { storage, uid, delay } from '@vtj/utils';

const STORAGE_OPTIONS = {
  prefix: '__VTJ__',
  type: 'local'
};

const PROJECT_KEY = 'Project';
const FILE_KEY = 'File';
const HISTORY_KEY = 'History';

export class StorageService extends Service {
  private createKey(...args: string[]) {
    return args.join('_');
  }

  public async getProject(project: ProjectSchema): Promise<ProjectSchema> {
    const id = project.id || uid();
    const key = this.createKey(PROJECT_KEY, id);
    return (
      storage.get(key, STORAGE_OPTIONS) || (await this.createProject(project))
    );
  }

  public async createProject(project: ProjectSchema): Promise<ProjectSchema> {
    const id = project.id || uid();
    const name = project.name || '未命名项目';
    const key = this.createKey(PROJECT_KEY, id);
    const schema: ProjectSchema = {
      ...project,
      id,
      name
    };
    storage.save(key, schema, STORAGE_OPTIONS);
    return schema;
  }

  public async updateProject(project: ProjectSchema): Promise<boolean> {
    if (!project.id) return false;
    const schema = await this.getProject(project);
    const newSchema = Object.assign(schema, project);
    return !!this.createProject(newSchema);
  }

  public async createFile(file: BlockSchema): Promise<BlockSchema> {
    const id = file.id || uid();
    const key = this.createKey(FILE_KEY, id);
    const schema: BlockSchema = {
      ...file,
      id
    };
    storage.save(key, schema, STORAGE_OPTIONS);
    return schema;
  }

  public async updateFile(file: BlockSchema): Promise<boolean> {
    if (!file.id) return false;
    return !!this.createFile(file);
  }

  public async getFile(id: string): Promise<BlockSchema> {
    const key = this.createKey(FILE_KEY, id);
    return storage.get(key, STORAGE_OPTIONS) as BlockSchema;
  }

  public async removeFile(id: string): Promise<boolean> {
    const key = this.createKey(FILE_KEY, id);
    const historyKey = this.createKey(HISTORY_KEY, id);
    storage.remove(key, STORAGE_OPTIONS);
    storage.remove(historyKey, STORAGE_OPTIONS);
    return true;
  }

  public async saveHistory(history: HistoryScheam): Promise<boolean> {
    const { blockId, items } = history;
    const key = this.createKey(HISTORY_KEY, blockId);
    storage.save(key, items, STORAGE_OPTIONS);
    return true;
  }

  public async getHistory(blockId: string): Promise<HistoryItemSchema[]> {
    const key = this.createKey(HISTORY_KEY, blockId);
    const items = (storage.get(key, STORAGE_OPTIONS) ||
      []) as HistoryItemSchema[];
    return items;
  }
}
