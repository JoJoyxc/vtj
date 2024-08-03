# 辅助工具



| 函数名         | 描述                        | 类型                                 | 参数                          | 返回值    |
| -------------- | --------------------------- | ------------------------------------ | ----------------------------- | --------- |
| isClient       | 是否浏览器环境              | `function`                           | -                             | `Boolean` |
| fileToBase64   | 文件对象 File 转换为 base64 | `(file:File)=> base64`               | (file:文件对象)               | `Base64`  |
| formDataToJson | FormData 转换为json         | `(data:FormData) => Json`            | (data:表单数据)               | `Json`    |
| dataURLtoBlob  | Base64 转换 Blob            | `(dataUrl:string) => Blob`           | (dataUrl:Base64)              | `Blob`    |
| blobToFile     | Blob 转 File                | `(blob:Blob,fileName:string)=> File` | (blob:Blob,fileName:文件名称) | `File`    |

