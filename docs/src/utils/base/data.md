# 数据转换




| 函数名         | 描述                                                              | 类型                                             | 参数                                  | 返回值        |
| -------------- | ----------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------- | ------------- |
| arrayToMap     | 数组转Map                                                         | `(data: T[], prop: keyof T) => Map`              | (data: T[], prop: keyof T)            | Map           |
| mapToObject    | Map转键值对                                                       | `(map:Map) => object  `                          | (map:Map )                            | object        |
| arrayToKv      | 数组转键值对                                                      | `(data:array, key:string,value:string)=> object` | (data:array, key:string,value:string) | object        |
| kvToArray      | 键值对转数组                                                      | `(data:array, key:string,value:string) => array` | (data:array, key:string,value:string) | array         |
| dedupArray     | 数组去重                                                          | `(data: T[], prop: keyof T) => array`            | (data: T[], prop: keyof T)            | array         |
| toArray        | 转换数组                                                          | `(val: any)=> array`                             | (maybeArray:[])                       | array         |
| zipObject      | 压缩对称，清除值为undefined或null的属性                           | `(obj:object)=> object`                          | (obj:any)                             | object        |
| omit           | 对象排除属性     <target:需要处理的对象, keys:需要排除的属性名称> | `(target:object,keys:string[])=> object`         | (target, keys)                        | object        |
| pick           | 对象提取属性                                                      | `(target:object,keys:string[])=> object`         | (target, keys)                        | object        |
| trim           | 递归对象或数组清除文本类型值的两边空格                            | `(val:object\| array)=> object\|array`           | (val)                                 | object\|array |
| sum            | 求合计                                                            | `(list:array,field:string)=> number`             | (list,field)                          | number        |
| avg            | 求平均值                                                          | `(list:array,field:string)=> number`             | (list,field)                          | number        |
| splitParser    | 字符串分隔转换成数组                                              | `(val:string, flag:string)=> array`              | (val:string, flag<','>:string)        | array         |
| splitStringify | 数组转换为字符串分隔                                              | `(val:array, flag:string)=> string`              | (val:array, flag<','>:string)         | string        |


### 示例

:::preview
demo-preview=../../examples/utils/data/data-1.vue
:::

