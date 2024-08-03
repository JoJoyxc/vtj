# 文件下载


| 函数名             | 描述     | 类型                                                         | 参数                                                    | 返回值 |
| ------------------ | -------- | ------------------------------------------------------------ | ------------------------------------------------------- | ------ |
| downloadUrl        | 下载文件 | `(url: string, filename: string = '') => void`               | `(url: 下载文件的路径, filename: 文件名称)`             | -      |
| downloadBlob       | 下载图片 | `(data: any, filename: string = '', type?: string) => void`  | `(data: 图片数据, filename: 图片名称, type?: 图片格式)` | -      |
| downloadRemoteFile | 下载文件 | `(  url: string,filename: string = '',type?: string)=> void` | `(  url:下载路径,filename: 文件名称,type?: 文件格式)`   | -      |
| downloadJson       | 下载JSON | `(data: any, filename: string = '')=> void`                  | `(data: 下载的数据, filename: 下载文件的名称)`          | -      |

