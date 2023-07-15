import fs from 'node:fs';
import prompts from 'prompts';
import {
  blue,
  cyan,
  green,
  //   lightGreen,
  lightRed,
  magenta,
  red,
  reset,
  yellow
} from 'kolorist';
import { formatTargetDir, isEmpty, isValidPackageName } from './utils';

type ColorFunc = (str: string | number) => string;

type Template = {
  name: string;
  display: string;
  color: ColorFunc;
};

const TEMPLATES: Template[] = [
  {
    name: 'lib',
    display: 'Lib',
    color: blue
  },
  {
    name: 'web',
    display: 'Web',
    color: green
  },
  {
    name: 'uniapp',
    display: 'UniApp',
    color: cyan
  },
  {
    name: 'node',
    display: 'Node',
    color: magenta
  },
  {
    name: 'egg',
    display: 'Egg',
    color: lightRed
  },
  {
    name: 'electron',
    display: 'Electron',
    color: yellow
  }
];

export async function options(
  defaultTargetDir: string,
  templateName: string = ''
) {
  let targetDir: string = defaultTargetDir;
  let result: prompts.Answers<'template' | 'overwrite' | 'projectName'>;
  try {
    result = await prompts(
      [
        {
          type: templateName ? null : 'select',
          name: 'template',
          message: reset('请选择项目模板:'),
          initial: 0,
          choices: TEMPLATES.map((template) => {
            return {
              title: template.color(template.display || template.name),
              value: template.name
            };
          })
        },
        {
          type: 'text',
          name: 'projectName',
          message: reset('项目包名:'),
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultTargetDir;
          },
          validate: (dir) =>
            isValidPackageName(dir) || 'Invalid package.json name'
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
          name: 'overwrite',
          message: () =>
            (targetDir === '.'
              ? 'Current directory'
              : `Target directory "${targetDir}"`) +
            ` is not empty. Remove existing files and continue?`
        }
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled');
        }
      }
    );
  } catch (cancelled: any) {
    console.log(cancelled.message);
    return;
  }
  return result;
}
