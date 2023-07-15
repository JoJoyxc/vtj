import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { options } from './options';
import minimist from 'minimist';
import { emptyDir, copy, getLibName, pkgFromUserAgent } from './utils';
import { initUI } from './ui';
const cwd = process.cwd();
const defaultTargetDir = 'vtj-project';

const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore'
};

const argv = minimist<{
  t?: string;
  template?: string;
}>(process.argv.slice(2), { string: ['_'] });

async function init() {
  // const argTargetDir = formatTargetDir(argv._[0]);
  const argTemplate = argv.template || argv.t;

  const result = await options(defaultTargetDir, argTemplate);
  const projectName = result?.projectName;
  if (!projectName) return;
  const root = path.join(cwd, projectName);
  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm';

  if (result?.overwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }
  const template: string = `template-${
    argTemplate ? argTemplate.toLowerCase() : result?.template
  }`;
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../..',
    template
  );
  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  const files = fs.readdirSync(templateDir);
  for (const file of files.filter(
    (f) => !['package.json', 'vite.config.ts'].includes(f)
  )) {
    write(file);
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8')
  );
  pkg.name = result?.projectName || defaultTargetDir;
  write('package.json', JSON.stringify(pkg, null, 2));

  if (result?.template !== 'node' && result?.template !== 'electron') {
    let viteConfig = fs.readFileSync(
      path.join(templateDir, `vite.config.ts`),
      'utf-8'
    );

    viteConfig = viteConfig.replace('{{libraryName}}', getLibName(pkg.name));
    write('vite.config.ts', viteConfig);
  }
  console.log(`\nDone. Now run:\n`);
  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`);
  }
  switch (pkgManager) {
    case 'yarn':
      console.log('  yarn');
      console.log('  yarn dev');
      break;
    default:
      console.log(`  ${pkgManager} install`);
      console.log(`  ${pkgManager} run dev`);
      break;
  }
  console.log();
}

const isUI = process.argv.slice(2)[0] === '--ui';
if (isUI) {
  initUI().catch((e) => console.log(e));
} else {
  init().catch((e) => console.error(e));
}
