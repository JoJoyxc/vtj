/**
 *  物料描述
 */
export interface Material {
  /**
   * 物料名称标识
   */
  name: string;
  /**
   * 产出导出变量名称
   */
  library: string;
  /**
   * 物料中文名称
   */
  label: string;
  /**
   * 分类配置
   */
  categories: MaterialCategory[];
  /**
   * 组件描述
   */
  components: ComponentDescription[];

  /**
   * 排序号，物料在组件库的排序，数字小的在前
   */
  order: number;
}

// 资产分类
export interface MaterialCategory {
  // 标识
  id: number | string;
  // 分类名称
  category: string;
}

export interface ComponentDescription {}
