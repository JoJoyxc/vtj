# 数据转换




| 函数名         | 描述                                                              | 类型       | 参数                                  | 返回值 |
| -------------- | ----------------------------------------------------------------- | ---------- | ------------------------------------- | ------ |
| arrayToMap     | 数组转Map                                                         | `function` | (data: T[], prop: keyof T)            | `Map`  |
| mapToObject    | Map转键值对                                                       | `function` | (map:Map )                            | -      |
| arrayToKv      | 数组转键值对                                                      | `function` | (data:array, key:string,value:string) | object |
| kvToArray      | 键值对转数组                                                      | `function` | (data:array, key:string,value:string) | array  |
| dedupArray     | 数组去重                                                          | `function` | (data: T[], prop: keyof T)            | array  |
| toArray        | 转换数组                                                          | `function` | (maybeArray:[])                       | array  |
| zipObject      | 压缩对称，清除值为undefined或null的属性                           | `function` | (obj:any)                             | object |
| omit           | 对象排除属性     <target:需要处理的对象, keys:需要排除的属性名称> | `function` | (target, keys)                        | object |
| pick           | 对象提取属性                                                      | `function` | (target, keys)                        | object |
| trim           | 递归对象或数组清除文本类型值的两边空格                            | `function` | (val)                                 | array  |
| sum            | 求合计                                                            | `function` | (list,field)                          | number |
| avg            | 求平均值                                                          | `function` | (list,field)                          | number |
| splitParser    | 字符串分隔转换成数组                                              | `function` | (val:string, flag<','>:string)        | array  |
| splitStringify | 数组转换为字符串分隔                                              | `function` | (val:array, flag<','>:string)         | string |


### 示例

:::preview
demo-preview=../../examples/utils/data/data-1.vue
:::

