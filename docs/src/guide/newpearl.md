# 自研低代码开发平台

## 背景

- 数式低代码推进过程中遇到障碍（需求、用户习惯、开发学习、组件适配成本等方面原因）
- 没有一款产品能高度匹配现有业务场景和用户习惯的交互方式

为了更好的与只有业务结合，采取自建低代码平台。

## 自建方案

![](../assets/newpearl/1.png)

- 借鉴数式“低无一体”理念，采用协议驱动模式
- 深度融合技术中台，充分利用现有基建
- 配置化生成可读源码，支持代码级别个性化定义
- 高度复刻现有系统交互方式，开发人员无学习心智负担

## 开发流程

低代码应用的开发流程：

1. 架构师根据需求搭建低代码开发工程，并且改造原业务应用与低代码应用融合。 低代码应用工程项目名称带有 `lowcode` 后缀，如： `nx-admin-lowcode`，运维配合接入jenkins，配置nginx采用二级目录形式访问低代码应用。
1. 后端开发在技术中台设计模型，完成模型相关配置，如表关联、数据来源、字段信息等。
1. 前端开发使用低代码设计器完成需求功能开发。如内置的组件实现不了需求，需报架构评估，决定实现方式（改造组件、新增组件、高代码实现）
1. 完成功能开发后，在设计器上整站发布，低代码产物需提交 `gitlab`。
1. jenkins完成发布部署。

## 数据模型

数据模型配置是无代码开发的一种方法， 并不是低代码开发的前提条件。 通过模型配置可以简化低代码开发过程。

数据模型管理在技术中台：数据管理 > 模型管理 菜单

通过模型配置可实现单表或多表的基础通用增、删、查、改， 个性化需求可使用设计器进行调整。

### 模型定义

```ts
export interface MetaModel extends MetaModelBase {
  /**
   * 子表
   */
  children?: MetaModelChild[];
}

export interface MetaModelBase {
  /**
   * 名称标识
   */
  name: string;

  /**
   * 名称描述
   */
  label: string;

  /**
   * 字段集合
   */
  fields?: MetaModelField[];

  /**
   * 只读
   */
  readOnly?: boolean;
}

export interface MetaModelField {
  /**
   * 字段名
   */
  name: string;

  /**
   * 字段名称描述
   */
  label?: string;

  /**
   * 数据类型
   */
  type?: MetaModelFieldType;

  /**
   * 主键
   */
  primary?: boolean;

  /**
   * 值唯一
   */
  unique?: boolean;

  /**
   * 值不能为空
   */
  required?: boolean;

  /**
   * 数据来源
   */
  source?: MetaModelSource;

  /**
   * 只读
   */
  readonly?: boolean;

  /**
   *  字段显示配置
   */
  showType?: 'add' | 'edit' | 'all' | 'none';
}

export interface MetaModelChild extends MetaModelBase {
  type: MetaModelChildType;
}

/**
 * 子表内容类型
 */
export type MetaModelChildType = 'grid' | 'custom' | string;

/**
 * 字段数据类型
 */
export type MetaModelFieldType =
  | 'String'
  | 'Number'
  | 'Int'
  | 'Boolean'
  | 'Date'
  | 'DateTime'
  | 'Dict'
  | 'DictArray'
  | 'Meta'
  | 'MetaArray'
  | 'Money'
  | 'HTML'
  | 'JSON'
  | 'Hidden';

/**
 * 字段数据来源
 */
export type MetaModelSourceFrom = 'dict' | 'meta' | 'parent';

export interface MetaModelSource {
  /**
   * 来源
   */
  from: MetaModelSourceFrom;

  /**
   * 数据来源编码： 字典组/功能号/父表名称
   */
  code: string;

  /**
   * 分组标识，相同名称分组可联动回填
   */
  group?: string;

  /**
   * 映射属性名
   */
  mapping: string;

  /**
   * 一对多关系
   */
  multiple?: boolean;
}
```

### 模型自带功能

根据上述的模型定义，以下功能可通过配置模型无码开发实现：

- 主从表关系，字段显示、排序
- 字段是否可编辑，指定字段编辑器
- 指定字段数据来源绑定，支持数据字典、数据配置、主表数据
- 字段联动绑定关联数据
- 字段唯一值、必填值校验

### 模型管理演示

:::info 数据模型管理sit环境链接
[https://sys-sit.newpearl.com/#/lowcode/22nhu3xrdsm?label=%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86](https://sys-sit.newpearl.com/#/lowcode/22nhu3xrdsm?label=%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86)
:::

## 低代码开发

### 项目工程

![](../assets/newpearl/2.png)

设计器生成的文件存储在工程根目录 `.vtj` 文件夹，不能删除，同时需要把文件提交gitlab。

#### npm 私库

以 `@newpearl/`前缀的依赖包需要从npm私库获取，首次使用需要登录私库

```sh
npm login --registry=https://nexus.newpearl.com/repository/frontend-public
# username：dev
# password：newpearl
```

#### 内置命令

- `npm run setup` 安装依赖
- `npm run dev` 运行开发环境
- `npm run clean` 清空依赖和产物，当依赖包的版本更新后，需要先清理再setup才能获取到新的版本
- `npm run build:sit` 打包sit
- `npm run build:uat` 打包uat
- `npm run build:prod` 打包live
- `npm run preview` 预览打包产物

### 设计器

#### 入口链接

启动低代码开发环境，在页面的右下角右编辑的图标，点击可进入到设计器并打开当前页面的设计模式

![](../assets/newpearl/3.png)

### 功能区

### 应用集成

### 开发示例
