import {
  type Service,
  type ProjectSchema,
  type BlockSchema,
  type HistorySchema,
  ProjectModel
} from '@vtj/core';

import { Storage } from '@vtj/utils';

const storage = new Storage({
  type: 'local',
  expired: 0,
  prefix: '__VTJ_'
});

export class StorageService implements Service {
  public init(project: ProjectSchema): Promise<ProjectSchema> {
    const model = new ProjectModel(project);
    const match = storage.get(`project_${model.id}`);
    const dsl = Object.assign(model.toDsl(), match || {});
    storage.save(`project_${model.id}`, dsl);
    return Promise.resolve(dsl);
  }
  public saveProject(project: ProjectSchema): Promise<boolean> {
    const model = new ProjectModel(project);
    storage.save(`project_${model.id}`, model.toDsl());
    return Promise.resolve(true);
  }
  public saveFile(file: BlockSchema): Promise<boolean> {
    storage.save(`file_${file.id}`, file);
    return Promise.resolve(true);
  }
  public getFile(id: string): Promise<BlockSchema> {
    const dsl = storage.get(`file_${id}`);
    if (dsl) {
      return Promise.resolve(dsl as BlockSchema);
    } else {
      return Promise.reject(null);
    }
  }
  public removeFile(id: string): Promise<boolean> {
    storage.remove(`file_${id}`);
    return Promise.resolve(true);
  }
  public saveHistory(history: HistorySchema): Promise<boolean> {
    storage.save(`history_${history.id}`, history);
    return Promise.resolve(true);
  }
  public removeHistory(id: string): Promise<boolean> {
    storage.remove(`history_${id}`);
    return Promise.resolve(true);
  }

  public getHistory(id: string): Promise<HistorySchema> {
    const dsl = storage.get(`history_${id}`);
    if (dsl) {
      return Promise.resolve(dsl as HistorySchema);
    } else {
      return Promise.reject(null);
    }
  }
}
