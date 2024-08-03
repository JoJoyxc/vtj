# regex 正则表达式


## 数据类型正则

| 函数名        | 描述           | 类型                          | 参数                | 返回值    |
| ------------- | -------------- | ----------------------------- | ------------------- | --------- |
| isUrl         | 检查url        | `(content: string)=> boolean` | `(content: string)` | `boolean` |
| isEmail       | 检查邮箱地址   | `(content: string)=> boolean` | `(content: string)` | `boolean` |
| isIdCardNo    | 检查身份证号码 | `(content: string)=> boolean` | `(content: string)` | `boolean` |
| isMobilePhone | 检查手机号码   | `(content: string)=> boolean` | `(content: string)` | `boolean` |
| isCarNo       | 检查车牌号码   | `(content: string)=> boolean` | `(content: string)` | `boolean` |




### 示例

:::preview
demo-preview=../../examples/utils/regex/regex-1.vue
:::



##   path-to-regexp

### 路径转化模式

| 函数名              | 描述                      | 类型                    | 参数              | 返回值 |
| ------------------- | ------------------------- | ----------------------- | ----------------- | ------ |
| pathToRegexp,       | 将路径字符串转换为 RegExp | `(val:string)=> string` | val: 需转换的路径 | string |
| pathToRegexpMatch,  | -                         | -                       | -                 | -      |
| pathToRegexpParse,  | -                         | -                       | -                 | -      |
| pathToRegexpCompile | -                         | -                       | -                 | -      |




### 示例

:::preview
demo-preview=../../examples/utils/regex/pathRegex.vue
:::
