# XGrid 表格


## 示例

### 基础表格


:::preview
demo-preview=../examples/ui/grid/base.vue
:::



## API

### 属性

| 属性名         | 说明                                                                        | 类型                | 默认值              |
| -------------- | --------------------------------------------------------------------------- | ------------------- | ------------------- |
| id             | 表格id, 保存用户自定义配置时需要用到 的唯一 标识 （被某些特定的功能所依赖） | `string`            | -                   |
| columns        | 列配置，重定义是为了实现列拖拽排序， watch列变化变化刷新列                  | `array`             | []                  |
| loader         | 数据加载器                                                                  | `function`          | -                   |
| rowSortable    | 行拖拽排序                                                                  | `boolean \| object` | false               |
| columnSortable | 列拖拽排序                                                                  | `boolean \| object` | false               |
| customable     | 开启用户自定义                                                              | `boolean`           | -                   |
| getCustom      | 获取自定义配置                                                              | `function`          | -                   |
| saveCustom     | 保存自定义配置                                                              | `function`          | -                   |
| resizable      | 开启列resizable                                                             | `boolean`           | false               |
| pager          | 开启分页                                                                    | `boolean`           | -                   |
| page           | 初始页码                                                                    | `number`            | 1                   |
| pageSize       | 初始每页显示条目个数                                                        | `number`            | 50                  |
| pageSizes      | 每页显示个数选择器的选项设置                                                | `array`             | [50, 100, 200, 500] |
| auto           | 初始执行加载函数                                                            | `boolean`           | true                |
| virtual        | 开启虚拟滚动                                                                | `boolean`           | false               |
| cellRenders    | 单元格渲染器                                                                | `object`            | -                   |
| editRenders    | 编辑状态单元格渲染器                                                        | `object`            | -                   |
| filterRenders  | 过滤器渲染器                                                                | `object`            | -                   |
| editable       | 开启支持编辑模式                                                            | `boolean`           | false               |
| sumFields      | 单页合计列                                                                  | `array`             | -                   |
| avgFields      | 单页平均值列                                                                | `array`             | -                   |
| sumAllFields   | 全部数据总计列                                                              | `object`            | -                   |