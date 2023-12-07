import type {
  ProjectSchema,
  PageFile,
  BlockFile,
  HistorySchema
} from './schemas';

export abstract class Service {
  public abstract init(project: ProjectSchema): Promise<ProjectSchema>;
  public abstract saveProject(project: ProjectSchema): Promise<boolean>;
  public abstract createFile(file: PageFile | BlockFile): Promise<boolean>;
  public abstract getFile(id: string): Promise<PageFile | BlockFile>;
  public abstract removeFile(id: string): Promise<boolean>;
  public abstract updateFile(file: PageFile | BlockFile): Promise<boolean>;
  public abstract saveHistory(history: HistorySchema): Promise<boolean>;
  public abstract getHistory(id: string): Promise<HistorySchema>;
}
