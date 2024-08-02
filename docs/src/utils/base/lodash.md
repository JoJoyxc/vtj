# Lodash

内置 Lodash 工具函数

## 数据类型校验

| 函数名        | 描述                                                                                         | 类型                             | 参数                    | 返回值                                                          |
| ------------- | -------------------------------------------------------------------------------------------- | -------------------------------- | ----------------------- | --------------------------------------------------------------- |
| isString      | 判断数据类型是否字符串                                                                       | `(val: any) => boolean`          | 需检测的数据            | 是否字符串                                                      |
| isFunction    | 判断数据类型是否函数类型                                                                     | `(val: any) => boolean`          | 需检测的数据            | 是否字函数                                                      |
| isArray       | 检查 value 是否是 Array 类对象                                                               | `(val:any) => boolean`           | value (*): 要检查的值。 | (boolean): 如果value是一个数组返回 true，否则返回 false。       |
| isObject      | 检查 value 是否为 Object 的language type                                                     | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isBoolean     | 检查 value 是否是原始 boolean 类型或者对象                                                   | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isBuffer      | 检查 value 是否是个 buffer                                                                   | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isArrayBuffer | 检查 value 是否是 ArrayBuffer 对象。                                                         | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isDate        | 检查 value 是否是 Date 对象                                                                  | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isUndefined   | 检查 value 是否是 undefined                                                                  | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isNaN         | 检查 value 是否是 NaN。                                                                      | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isNull        | 检查 value 是否是 null                                                                       | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isNumber      | 检查 value 是否是原始Number数值型 或者 对象                                                  | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isSymbol      | 检查 value 是否是原始 Symbol 或者对象                                                        | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isPlainObject | 检查 value 是否是普通对象。 也就是说该对象由 Object 构造函数创建，或者 [[Prototype]] 为 null | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isEqual       | 执行深比较来确定两者的值是否相等。[注意](https://www.lodashjs.com/docs/lodash.isEqual)       | `(val:any,other:any) => boolean` | value (*): 要检查的值。 | (boolean): 如果 两个值完全相同，那么返回 true，否则返回 false。 |



:::preview
demo-preview=../../examples/utils/lodash-1.vue
:::

## 字符串转换

| 函数名              | 描述                           | 类型 | 参数                       | 返回值                         |
| ------------------- | ------------------------------ | ---- | -------------------------- | ------------------------------ |
| lowerFirst          | 转换字符串string的首字母为小写 |      | (string): 要转换的字符串。 | (string): 返回转换后的字符串。 |
| upperFirst          | 转换字符串string的首字母为大写 |      | (string): 要转换的字符串。 | (string): 返回转换后的字符串。 |
| upperFirstCamelCase |                                |      |                            |                                |
| camelCase           |                                |      |                            |                                |
| kebabCase           |                                |      |                            |                                |
| camelCase           |                                |      |                            |                                |
| snakeCase           |                                |      |                            |                                |

### 示例
