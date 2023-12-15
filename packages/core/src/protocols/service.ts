import type { ProjectSchema, BlockSchema, HistorySchema } from './schemas';

export abstract class Service {
  public abstract init(project: ProjectSchema): Promise<ProjectSchema>;
  public abstract saveProject(project: ProjectSchema): Promise<boolean>;
  public abstract saveFile(file: BlockSchema): Promise<boolean>;
  public abstract getFile(id: string): Promise<BlockSchema>;
  public abstract removeFile(id: string): Promise<boolean>;
  public abstract saveHistory(history: HistorySchema): Promise<boolean>;
  public abstract removeHistory(id: string): Promise<boolean>;
  public abstract getHistory(id: string): Promise<HistorySchema>;
}
