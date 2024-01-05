import {
  ProjectModel,
  type ProjectSchema,
  type BlockSchema,
  type HistorySchema
} from '@vtj/core';

import { resolve } from 'path';
import {
  readJsonSync,
  pathExistsSync,
  writeJsonSync,
  ensureFileSync,
  removeSync
} from '@vtj/node';
import { fail, success, type ApiRequest } from './shared';

const root = resolve('./');
const vtjDir = resolve('.vtj');

const getProjectFilePath = (name: string) => {
  return resolve(vtjDir, `${name.replace(/\//g, '__')}.json`);
};

const getFilePath = (id: string) => {
  return resolve(vtjDir, `files/${id}.json`);
};

const getHistoryFilePath = (id: string) => {
  return resolve(vtjDir, `histories/${id}.json`);
};

const getHistoryItemFilePath = (fId: string, id: string) => {
  return resolve(vtjDir, `histories/${fId}/${id}.json`);
};

const getHistoryItemDir = (fId: string) => {
  return resolve(vtjDir, `histories/${fId}`);
};

export async function notMatch(_req: ApiRequest) {
  return fail('找不到处理程序');
}

export async function init(_req: ApiRequest) {
  const pkg = readJsonSync(resolve(root, 'package.json'));
  // 从项目的 package.json 中读取项目信息
  const { name, description } = pkg || {};
  // 项目文件路径
  const filePath = getProjectFilePath(name);

  // 如果已文件经存在，则直接返回文件内容
  if (pathExistsSync(filePath)) {
    const json = readJsonSync(filePath);
    return success(json);
  }

  // 否则，创建一个新的项目文件
  const project = new ProjectModel({
    id: name,
    name: description,
    description
  });
  const dsl = project.toDsl();
  ensureFileSync(filePath);
  writeJsonSync(filePath, dsl);
  return success(dsl);
}

export async function saveProject(req: ApiRequest) {
  const project = req.data as ProjectSchema;
  const filePath = getProjectFilePath(project.id as string);
  if (pathExistsSync(filePath)) {
    writeJsonSync(filePath, project);
    return success(true);
  } else {
    return fail('项目文件不存在');
  }
}

export async function saveFile(req: ApiRequest) {
  const file = req.data as BlockSchema;
  const filePath = getFilePath(file.id as string);
  if (!pathExistsSync(filePath)) {
    ensureFileSync(filePath);
  }
  writeJsonSync(filePath, file);
  return success(true);
}

export async function getFile(req: ApiRequest) {
  const id = req.data as string;
  const filePath = getFilePath(id);
  if (pathExistsSync(filePath)) {
    const json = readJsonSync(filePath);
    return success(json);
  } else {
    return fail('文件不存在');
  }
}

export async function removeFile(req: ApiRequest) {
  const id = req.data as string;
  const filePath = getFilePath(id);
  if (pathExistsSync(filePath)) {
    removeSync(filePath);
    return success(true);
  } else {
    return fail('文件不存在');
  }
}

export async function getHistory(req: ApiRequest) {
  const id = req.data as string;
  const filePath = getHistoryFilePath(id);
  if (pathExistsSync(filePath)) {
    const json = readJsonSync(filePath);
    return success(json);
  } else {
    return success({});
  }
}

export async function saveHistory(req: ApiRequest) {
  const file = req.data as HistorySchema;
  const filePath = getHistoryFilePath(file.id as string);
  if (!pathExistsSync(filePath)) {
    ensureFileSync(filePath);
  }
  writeJsonSync(filePath, file);
  return success(true);
}

export async function removeHistory(req: ApiRequest) {
  const id = req.data as string;
  const filePath = getHistoryFilePath(id);
  const dir = getHistoryItemDir(id);
  if (pathExistsSync(filePath)) {
    removeSync(filePath);
    removeSync(dir);
    return success(true);
  } else {
    return fail('文件不存在');
  }
}

export async function getHistoryItem(req: ApiRequest) {
  const { fId, id } = req.data || {};
  const filePath = getHistoryItemFilePath(fId, id);
  if (pathExistsSync(filePath)) {
    const json = readJsonSync(filePath);
    return success(json);
  } else {
    return fail('文件不存在');
  }
}

export async function saveHistoryItem(req: ApiRequest) {
  const { fId, item } = req.data || {};
  const filePath = getHistoryItemFilePath(fId, item.id);
  if (!pathExistsSync(filePath)) {
    ensureFileSync(filePath);
  }
  writeJsonSync(filePath, item);
  return success(true);
}

export async function removeHistoryItem(req: ApiRequest) {
  const { fId, ids = [] } = req.data || {};
  ids.forEach((id: string) => {
    const filePath = getHistoryItemFilePath(fId, id);
    removeSync(filePath);
  });
  return success(true);
}
