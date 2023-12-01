import { uid, merge, upperFirstCamelCase } from '@vtj/base';
import type {
  ProjectSchema,
  Dependencie,
  PageFile,
  BlockFile,
  ApiSchema
} from '../protocols';
import { emitter, logger } from '../tools';
import { BlockModel } from './block';

/**
 * 项目信息更新时触发事件
 */
export const EVENT_PROJECT_CHANGE = 'EVENT_PROJECT_CHANGE';
/**
 * 打开/关闭文件时触发事件
 */
export const EVENT_PROJECT_ACTIVED = 'EVENT_PROJECT_ACTIVED';

/**
 * 依赖更新时触发
 */
export const EVENT_PROJECT_DEPS_CHANGE = 'EVENT_PROJECT_DEPS_CHANGE';

/**
 * 页面文件更新
 */
export const EVENT_PROJECT_PAGES_CHANGE = 'EVENT_PROJECT_PAGES_CHANGE';

/**
 * 区块文件更新
 */
export const EVENT_PROJECT_BLOCKS_CHANGE = 'EVENT_PROJECT_BLOCKS_CHANGE';

/**
 * API更新
 */
export const EVENT_PROJECT_APIS_CHANGE = 'EVENT_PROJECT_APIS_CHANGE';

export class ProjectModel {
  private readonly __VTJ_PROJECT__: boolean = true;
  id: string = '';
  name: string = '';
  description: string = '';
  homepage: string = '';
  dependencies: Dependencie[] = [];
  pages: PageFile[] = [];
  blocks: BlockFile[] = [];
  apis: ApiSchema[] = [];
  current?: BlockFile | PageFile;
  static attrs: string[] = [
    'name',
    'homepage',
    'description',
    'dependencies',
    'pages',
    'blocks',
    'apis'
  ];
  constructor(schema: ProjectSchema) {
    const { id } = schema;
    this.id = id || uid();
    this.update(schema, true);
  }

  update(schema: Partial<ProjectSchema>, silent: boolean = false) {
    for (const key of ProjectModel.attrs) {
      const value = schema[key as keyof ProjectSchema];
      if (value) {
        (this as any)[key] = value;
      }
    }
    if (silent) {
      emitter.emit(EVENT_PROJECT_CHANGE, this);
    }
  }

  toDsl() {
    const { __VTJ_PROJECT__, id } = this;
    const attrs = ProjectModel.attrs.reduce(
      (result, current) => {
        result[current] = (this as any)[current];
        return result;
      },
      {} as Record<string, any>
    );
    return {
      __VTJ_PROJECT__,
      id,
      ...attrs
    } as ProjectSchema;
  }
  /**
   * 打开文件
   * @param file
   * @param silent
   */
  active(file: BlockFile | PageFile, silent: boolean = false) {
    this.current = file;
    if (!silent) {
      emitter.emit(EVENT_PROJECT_ACTIVED, this);
    }
  }
  /**
   * 关闭文件
   * @param silent
   */
  deactivate(silent: boolean = false) {
    this.current = undefined;
    if (!silent) {
      emitter.emit(EVENT_PROJECT_ACTIVED, this);
    }
  }

  /**
   * 新增或更新依赖
   * @param item
   * @param silent
   */
  setDeps(item: Dependencie, silent: boolean = false) {
    const deps = this.dependencies;
    const index = deps.findIndex((n) => n.package === item.package);
    if (index > -1) {
      deps.splice(index, 1, {
        ...deps[index],
        ...item
      });
    } else {
      deps.push(item);
    }
    if (!silent) {
      emitter.emit(EVENT_PROJECT_DEPS_CHANGE, this);
    }
  }

  /**
   * 删除依赖
   * @param item
   * @param silent
   */
  removeDeps(item: Dependencie, silent: boolean = false) {
    const deps = this.dependencies;
    const index = deps.findIndex((n) => n.package === item.package);
    if (index > -1) {
      deps.splice(index, 1);
    }
    if (!silent) {
      emitter.emit(EVENT_PROJECT_DEPS_CHANGE, this);
    }
  }

  /**
   * 合并依赖
   * @param source
   * @param silent
   */
  mergeDeps(source: Dependencie[], silent: boolean = false) {
    this.dependencies = merge(this.dependencies, source);
    if (!silent) {
      emitter.emit(EVENT_PROJECT_DEPS_CHANGE, this);
    }
  }

  /**
   * 根据页面id查找页面或目录
   * @param id
   * @returns
   */
  getPage(id: string) {
    const finder = (
      id: string,
      pages: PageFile[] = []
    ): PageFile | undefined => {
      for (const page of pages) {
        if (page.id === id) {
          return page;
        } else {
          if (page.children && page.children.length) {
            const match = finder(id, page.children);
            if (match) {
              return match;
            }
          }
        }
      }
    };
    return finder(id, this.pages);
  }

  /**
   * 查找全部页面，不含目录
   * @returns
   */
  getPages() {
    const finder = (pages: PageFile[] = []) => {
      let result: PageFile[] = [];
      for (const page of pages) {
        if (page.dir) {
          if (page.children && page.children.length) {
            result = result.concat(finder(page.children));
          }
        } else {
          result.push(page);
        }
      }
      return result;
    };
    return finder(this.pages);
  }

  /**
   * 新建页面
   * @param page
   * @param parentId
   * @param silent
   */
  createPage(page: PageFile, parentId?: string, silent: boolean = false) {
    page.id = page.id || uid();
    if (page.dir) {
      page.children = [];
    } else {
      page.dsl = new BlockModel({
        id: page.id,
        name: upperFirstCamelCase(page.name)
      }).toDsl();
    }

    if (parentId) {
      const dir = this.getPage(parentId);
      if (dir) {
        if (dir.children) {
          dir.children.push(page);
        } else {
          dir.children = [page];
        }
      } else {
        logger.warn(`not found PageFile for id: ${parentId} `);
      }
    } else {
      this.pages.push(page);
    }

    // 没有打开任何文件时，自动打开新建的页面
    if (!this.current) {
      this.active(page, silent);
    }

    if (!silent) {
      emitter.emit(EVENT_PROJECT_PAGES_CHANGE, this);
    }
  }

  /**
   * 更新页面
   * @param page
   * @param silent
   */
  updatePage(page: PageFile, silent: boolean = false) {
    const match = this.getPage(page.id);
    if (match) {
      Object.assign(match, page);
    } else {
      logger.warn(`not found PageFile for id: ${page.id} `);
    }
    if (!silent) {
      emitter.emit(EVENT_PROJECT_PAGES_CHANGE, this);
    }
  }

  /**
   * 复制页面
   * @param page
   * @param parentId
   * @param silent
   */
  clonePage(page: PageFile, parentId?: string, silent: boolean = false) {
    const newPage = merge({}, page, { id: uid() });
    const pages = parentId
      ? this.getPage(parentId)?.children || []
      : this.pages;
    const index = pages.findIndex((n) => n.id === page.id);
    pages.splice(index, 0, newPage);

    if (!silent) {
      emitter.emit(EVENT_PROJECT_PAGES_CHANGE, this);
    }
  }

  /**
   * 删除页面或目录
   * @param id
   * @param silent
   */
  removePage(id: string, silent: boolean = false) {
    const remover = (id: string, pages: PageFile[]): void => {
      const index = pages.findIndex((n) => n.id === id);
      if (index >= 0) {
        pages.splice(index, 1);
        return;
      }
      for (const page of pages) {
        if (page.children && page.children.length) {
          return remover(id, page.children);
        }
      }
    };
    remover(id, this.pages);
    if (this.current?.id === id) {
      this.deactivate(silent);
    }
    if (!silent) {
      emitter.emit(EVENT_PROJECT_PAGES_CHANGE, this);
    }
  }

  /**
   * 获取区块文件
   * @param id
   * @returns
   */
  getBlock(id: string) {
    return this.blocks.find((n) => n.id === id);
  }

  /**
   * 创建区块
   * @param block
   * @param silent
   */
  createBlock(block: BlockFile, silent: boolean = false) {
    const id = block.id || uid();
    const name = upperFirstCamelCase(block.name);
    block.id = id;
    block.dsl = new BlockModel({ id, name }).toDsl();
    this.blocks.push(block);
    if (!silent) {
      emitter.emit(EVENT_PROJECT_BLOCKS_CHANGE, this);
    }
  }

  /**
   *
   * @param block 更新区块
   * @param silent
   */
  updateBlock(block: BlockFile, silent: boolean = false) {
    const match = this.getBlock(block.id);
    if (match) {
      Object.assign(match, block);
    } else {
      logger.warn(`not found PageFile for id: ${block.id} `);
    }
    if (!silent) {
      emitter.emit(EVENT_PROJECT_BLOCKS_CHANGE, this);
    }
  }

  /**
   * 删除区块
   * @param id
   * @param silent
   */
  removeBlock(id: string, silent: boolean = false) {
    const blocks = this.blocks;
    const index = blocks.findIndex((n) => n.id === id);
    if (index > -1) {
      blocks.splice(index, 1);
      if (this.current?.id === id) {
        this.deactivate(silent);
      }
    } else {
      logger.warn(`not found PageFile for id: ${id} `);
    }
    if (!silent) {
      emitter.emit(EVENT_PROJECT_BLOCKS_CHANGE, this);
    }
  }

  /**
   * 检查是否存在名称的区块
   * @param name
   * @returns
   */
  existBlockName(name: string) {
    return this.blocks.some((n) => n.name === name);
  }

  /**
   * 检测是否存在名称的页面
   * @param name
   * @returns
   */
  existPageName(name: string) {
    const pages = this.getPages();
    return pages.some((n) => n.name === name);
  }

  /**
   * 新增或更新api
   * @param item
   * @param silent
   */
  setApi(item: ApiSchema, silent: boolean = false) {
    const match = this.apis.findIndex((n) => n.name === item.name);
    if (match) {
      Object.assign(match, item);
    } else {
      this.apis.push(item);
    }
    if (!silent) {
      emitter.emit(EVENT_PROJECT_APIS_CHANGE, this);
    }
  }
  /**
   * 删除api
   * @param name
   * @param silent
   */
  removeApi(name: string, silent: boolean = false) {
    const index = this.apis.findIndex((n) => n.name === name);
    if (index > -1) {
      this.apis.splice(index, 1);
    } else {
      logger.warn(`not found Api for name: ${name} `);
    }
    if (!silent) {
      emitter.emit(EVENT_PROJECT_APIS_CHANGE, this);
    }
  }
}
