import { StorageService, ProjectSchema, BlockSchema } from './shared';
export type ServiceType = 'storage' | 'file';
export class Service {
  public storage?: StorageService;
  constructor(
    public type: ServiceType,
    public projectId: string,
    public modules?: Record<string, () => Promise<any>>
  ) {
    if (type === 'storage') {
      this.storage = new StorageService();
    }
  }

  async getProject(): Promise<ProjectSchema | null> {
    const { type, storage, projectId, modules } = this;
    if (type === 'storage' && storage) {
      return await storage.getProject({ id: projectId } as any);
    }
    if (type === 'file' && modules) {
      const loader = modules[`.vtj/project/${projectId}.json`];
      const json = loader ? await loader() : null;
      return json?.default || null;
    }
    return null;
  }

  async getFile(id: string): Promise<BlockSchema | null> {
    const { type, storage, modules } = this;
    if (type === 'storage' && storage) {
      return await storage.getFile(id);
    }
    if (type === 'file' && modules) {
      const loader = modules[`.vtj/file/${id}.json`];
      const json = loader ? await loader() : null;
      return json?.default || null;
    }
    return null;
  }
}
