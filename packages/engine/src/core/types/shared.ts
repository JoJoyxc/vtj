import { DefineComponent } from 'vue';

export type JSONValue =
  | boolean
  | string
  | number
  | null
  | undefined
  | JSONArray
  | JSONObject;

export type JSONArray = JSONValue[];

export interface JSONObject {
  [key: string]: JSONValue;
}

// 自定义表达式代码
export interface JSExpression {
  type: 'JSExpression';
  id?: string;
  value: string;
}

// 自定义函数代码
export interface JSFunction {
  type: 'JSFunction';
  id?: string;
  value: string;
}

// 组件属性描述
export interface PropsSchema {
  key?: string | number | JSExpression;
  ref?: string | JSExpression | JSFunction;
  style?: Record<string, any>;
  class?: string | string[] | JSExpression;
  [index: string]: JSONValue | JSExpression | JSFunction;
}

// export type ComponentsMap = Record<string, any>;

// 组件状态描述
export type StateSchema = Record<string, JSONValue | JSExpression | JSFunction>;

// IDE区域
export type Region =
  | 'brand'
  | 'toolbar'
  | 'action'
  | 'status'
  | 'apps'
  | 'workspace'
  | 'setting';

export type VueComponent = DefineComponent<any, any, any, any, any>;

// 文件类型
export type FileType = 'pages' | 'blocks';

export type DropHelperType = 'inner' | 'left' | 'top' | 'right' | 'bottom';

export type DataSourceHandler = (...args: any[]) => Promise<any>;

