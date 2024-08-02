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


### 示例

:::preview
demo-preview=../../examples/utils/lodash-1.vue
:::

## 字符串转换

| 函数名     | 描述                                                                                                                                                                                                                                                                                  | 类型                              | 参数                                       | 返回值                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------ | ---------------------------------------------- |
| lowerFirst | 转换字符串string的首字母为小写                                                                                                                                                                                                                                                        | lowerFirst('First')=> 'first'     | (string): 要转换的字符串。                 | (string): 返回转换后的字符串。                 |
| upperFirst | 转换字符串string的首字母为大写                                                                                                                                                                                                                                                        | upperFirst('fred') => 'Fred'      | (string): 要转换的字符串。                 | (string): 返回转换后的字符串。                 |
| camelCase  | 转换字符串string为驼峰写法                                                                                                                                                                                                                                                            | camelCase('Foo Bar') => 'fooBar'  | (string): 要转换的字符串。                 | (string): 返回驼峰写法的字符串。               |
| kebabCase  | 转换字符串string为kebab case.                                                                                                                                                                                                                                                         | kebabCase('fooBar') => 'foo-bar'  | (string): 要转换的字符串。                 | (string): 返回转换后的字符串。                 |
| snakeCase  | 转换字符串string为snake case                                                                                                                                                                                                                                                          | snakeCase('Foo Bar') => 'foo_bar' | (string): 要转换的字符串。                 | (string): 返回转换后的字符串。                 |
| noop       | 这个方法返回 undefined。                                                                                                                                                                                                                                                              | noop()=> undefined                | -                                          | undefined                                      |
| get        | 根据 object对象的path路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代。                                                                                                                                                                                                | -                                 | (object,path,[defaultValue])               | (*): 返回解析的值。                            |
| set        | 设置 object对象中对应 path 属性路径上的值，如果path不存在，则创建。 缺少的索引属性会创建为数组，而缺少的属性会创建为对象。 使用_.setWith 定制path创建                                                                                                                                 | -                                 | (object,path,[defaultValue])               | (Object): 返回object                           |
| merge      | 该方法类似_.assign， 除了它递归合并 sources 来源对象自身和继承的可枚举属性到 object 目标对象。如果目标值存在，被解析为undefined的sources 来源对象属性将被跳过。数组和普通对象会递归合并，其他对象和值会被直接分配覆盖。源对象从从左到右分配。后续的来源对象属性会覆盖之前分配的属性。 | -                                 | (object:目标对象,[source]:来源对象)        | (Object): 返回 object.                         |
| cloneDeep  | 会递归拷贝 value。（注：也叫深拷贝）。                                                                                                                                                                                                                                                | -                                 | value (*): 要深拷贝的值。                  | (*): 返回拷贝后的值。                          |
| debounce   | 防抖                                                                                                                                                                                                                                                                                  | -                                 | (func,wait,options)                        | (Function): 返回新的 debounced（防抖动）函数。 |
| throttle   | 节流                                                                                                                                                                                                                                                                                  | -                                 | (func,wait,options)                        | (Function): 返回节流的函数。                   |
| template   | 创建一个预编译模板方法，可以插入数据到模板中 "interpolate" 分隔符相应的位置。 HTML会在 "escape" 分隔符中转换为相应实体。 在 "evaluate" 分隔符中允许执行JavaScript代码。 在模板中可以自由访问变量。 如果设置了选项对象，则会优先覆盖_.templateSettings 的值。                          | -                                 | ((string): 模板字符串, (Object): 选项对象) | (Function): 返回编译模板函数。                 |

### 示例


:::preview
demo-preview=../../examples/utils/lodash-2.vue
:::