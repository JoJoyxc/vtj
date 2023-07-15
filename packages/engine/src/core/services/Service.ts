import {
  ProjectSchema,
  BlockSchema,
  HistoryScheam,
  HistoryItemSchema
} from '../types';

export abstract class Service {
  public abstract getProject(project: ProjectSchema): Promise<ProjectSchema>;
  public abstract createProject(project: ProjectSchema): Promise<ProjectSchema>;
  public abstract updateProject(project: ProjectSchema): Promise<boolean>;
  public abstract createFile(file: BlockSchema): Promise<BlockSchema>;
  public abstract updateFile(file: BlockSchema): Promise<boolean>;
  public abstract getFile(id: string): Promise<BlockSchema>;
  public abstract removeFile(id: string): Promise<boolean>;
  public abstract saveHistory(history: HistoryScheam): Promise<boolean>;
  public abstract getHistory(blockId: string): Promise<HistoryItemSchema[]>;
}
