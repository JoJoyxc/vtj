# XQueryForm 查询表单


## 示例


### 基础用法

:::preview
demo-preview=../examples/ui/queryForm/queryForm-1.vue
:::


### 基础用法

:::preview
demo-preview=../examples/ui/queryForm/queryForm-1.vue
:::






## API

### 属性 

| 属性名        | 说明               | 类型      | 默认值 |
| ------------- | ------------------ | --------- | ------ |
| collapsible   | 是否折叠面板       | `boolean` | true   |
| items         | 表单中的项         | `array`   | -      |
| inlineColumns | inline模式显示列数 | `number`  | -      |



### 插槽

| 插槽名 | 说明       | 类型 |
| ------ | ---------- | ---- |
| custom | 自定义内容 | -    |



### 暴露

| 名称             | 说明     | 类型 |
| ---------------- | -------- | ---- |
| validate         | 校验方法 |
| submit           | -        |
| reset            | -        |
| formRef          | -        |
| $vtjDynamicSlots | -        |