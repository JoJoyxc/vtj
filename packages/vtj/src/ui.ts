import { fileURLToPath } from 'url';
import prompts from 'prompts';
import { reset, yellow, green } from 'kolorist';
import { resolve, dirname } from 'path';
import { camelCase, upperFirst, kebabCase } from 'lodash-es';
import fs from 'fs-extra';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const UI_DIR = resolve('packages/ui/src');
const DEV_DIR = resolve('dev/src');
const TEMPLATE_DIR = resolve(__dirname, '../template-ui');
const COMPONENTS_DIR = resolve(UI_DIR, 'components');
const STYLE_DIR = resolve(UI_DIR, 'style');

function upperFirstCamelCase(name: string) {
  return upperFirst(camelCase(name));
}

function isExistName(name: string) {
  const kebabCaseName = kebabCase(name);
  const dirs = fs.readdirSync(COMPONENTS_DIR);
  return !!dirs.find((n) => n === kebabCaseName);
}

function outputFile(
  name: string,
  from: string,
  to: string,
  outDir: string = COMPONENTS_DIR
) {
  const kebabCaseName = kebabCase(name);
  const camelCaseName = camelCase(name);
  const upperFirstCamelCaseName = upperFirstCamelCase(name);

  let content = fs.readFileSync(resolve(TEMPLATE_DIR, from), 'utf-8');
  content = content
    .replace(/my-component/g, kebabCaseName)
    .replace(/component/g, camelCaseName)
    .replace(/Component/g, upperFirstCamelCaseName);

  fs.outputFileSync(
    resolve(outDir, outDir === COMPONENTS_DIR ? `${kebabCaseName}/${to}` : to),
    content
  );
}

function updateComponentIndex(kebabCaseName: string) {
  const filePath = resolve(COMPONENTS_DIR, 'index.ts');
  let content = fs.readFileSync(filePath, 'utf-8');
  content += `\nexport * from './${kebabCaseName}';`;
  fs.outputFileSync(filePath, content);
}

function updateList(upperFirstCamelCaseName: string) {
  const filePath = resolve(UI_DIR, 'list.ts');
  let content = fs.readFileSync(filePath, 'utf-8');
  const XName = `X${upperFirstCamelCaseName}`;
  content = content.replace('} from', `,\n${XName}\n} from`);
  content = content.replace('];', `, ${XName}];`);
  fs.outputFileSync(filePath, content);
}

function updateIndexScss(kebabCaseName: string) {
  const filePath = resolve(STYLE_DIR, 'index.scss');
  let content = fs.readFileSync(filePath, 'utf-8');
  content += `\n@use '${kebabCaseName}';`;
  fs.outputFileSync(filePath, content);
}

function createComponentFiles(name: string) {
  const kebabCaseName = kebabCase(name);
  const camelCaseName = camelCase(name);
  const upperFirstCamelCaseName = upperFirstCamelCase(name);

  outputFile(name, 'component.ts', `${camelCaseName}.ts`);
  outputFile(name, 'Component.vue', `${upperFirstCamelCaseName}.vue`);
  outputFile(name, 'index.ts', 'index.ts');
  outputFile(name, 'component.scss', `${kebabCaseName}.scss`, STYLE_DIR);

  updateComponentIndex(kebabCaseName);
  updateList(upperFirstCamelCaseName);
  updateIndexScss(kebabCaseName);
}

function createDev(name: string) {
  const kebabCaseName = kebabCase(name);
  const camelCaseName = camelCase(name);
  const upperFirstCamelCaseName = upperFirstCamelCase(name);
  const viewPath = resolve(DEV_DIR, `views/ui/${kebabCaseName}.vue`);
  const routePath = resolve(DEV_DIR, `router/routes/ui.ts`);

  let content = fs.readFileSync(resolve(TEMPLATE_DIR, 'dev.vue'), 'utf-8');
  content = content
    .replace(/component/g, camelCaseName)
    .replace(/Component/g, upperFirstCamelCaseName)
    .replace(/my-component/g, kebabCaseName);

  fs.outputFileSync(viewPath, content);

  let routeContent = fs.readFileSync(routePath, 'utf-8');
  routeContent = routeContent.replace(
    '];',
    `, {
    path: '/ui/${kebabCaseName}',
    component: () => import('@/views/ui/${kebabCaseName}.vue')
  }];`
  );
  fs.outputFileSync(routePath, routeContent);
}

export async function initUI() {
  const result = await prompts([
    {
      type: 'text',
      name: 'componentName',
      message: reset('请输入组件名称(ex: MyComponent):')
    }
  ]);

  if (!result.componentName) {
    console.log(yellow('缺少组件名称！'));
    return;
  }

  const upperFirstCamelCaseName = upperFirstCamelCase(result.componentName);

  if (isExistName(result.componentName)) {
    console.log(yellow(`已存在 ${upperFirstCamelCaseName} 组件，请更换名称！`));
    return;
  }

  try {
    createComponentFiles(result.componentName);
    createDev(result.componentName);
    console.log(green(`组件 ${upperFirstCamelCaseName} 已创建成功！`));
  } catch (e) {
    console.log(yellow(`创建失败：${e}`));
  }
}
