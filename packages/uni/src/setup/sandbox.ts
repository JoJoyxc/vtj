import { type ProjectSchema } from '@vtj/core';

export function initUniSandbox(
  iframe: any,
  _project: ProjectSchema,
  onReady: (env: any) => void
) {
  const cw = iframe.contentWindow;
  const doc = cw.document;
  cw.__ready__ = onReady;
  doc.open();
  doc.write(`
     <!DOCTYPE html>
     <html lang="zh-CN">
       <head>
       <meta charset="utf-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0,viewport-fit=cover"/>

       </head>
       <body> 
       </body>

       <script>
        __ready__(window);
       </script> 
     </html>
    `);
  doc.close();
}
