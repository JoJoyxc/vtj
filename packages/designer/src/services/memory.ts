import type {
  Service,
  ProjectSchema,
  PageFile,
  BlockFile,
  HistorySchema
} from '@vtj/core';

export class MemoryService implements Service {
  public init(project: ProjectSchema): Promise<ProjectSchema> {
    console.log('MemoryService', project);
    return Promise.resolve({} as ProjectSchema);
  }
  public saveProject(project: ProjectSchema): Promise<boolean> {
    console.log(project);
    return Promise.resolve(true);
  }
  public createFile(file: PageFile | BlockFile): Promise<boolean> {
    console.log(file);
    return Promise.resolve(true);
  }
  public getFile(id: string): Promise<PageFile | BlockFile> {
    console.log(id);
    return Promise.resolve({} as PageFile);
  }
  public removeFile(id: string): Promise<boolean> {
    console.log(id);
    return Promise.resolve(true);
  }
  public updateFile(file: PageFile | BlockFile): Promise<boolean> {
    console.log(file);
    return Promise.resolve(true);
  }
  public saveHistory(history: HistorySchema): Promise<boolean> {
    console.log(history);
    return Promise.resolve(true);
  }
  public getHistory(id: string): Promise<HistorySchema> {
    console.log(id);
    return Promise.resolve({} as HistorySchema);
  }
}
