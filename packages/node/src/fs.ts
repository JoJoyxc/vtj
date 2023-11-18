import fs from 'fs-extra';
export { fs };
export const copy = fs.copy;
export const emptyDir = fs.emptyDir;
export const ensureFile = fs.ensureFile;
export const ensureLink = fs.ensureLink;
export const ensureSymlink = fs.ensureSymlink;
export const mkdirp = fs.mkdirp;
export const mkdirs = fs.mkdirs;
export const move = fs.move;
export const outputFile = fs.outputFile;
export const outputJson = fs.outputJson;
export const pathExists = fs.pathExists;

export const remove = fs.remove;
export const copySync = fs.copySync;
export const emptyDirSync = fs.emptyDirSync;
export const ensureFileSync = fs.ensureFileSync;
export const ensureDirSync = fs.ensureDirSync;
export const ensureSymlinkSync = fs.ensureSymlinkSync;
export const mkdirpSync = fs.mkdirpSync;
export const moveSync = fs.moveSync;
export const outputFileSync = fs.outputFileSync;
export const outputJsonSync = fs.outputJsonSync;
export const pathExistsSync = fs.pathExistsSync;
export const removeSync = fs.removeSync;
export const readJson = fs.readJson;
export const writeJson = fs.writeJson;
export const readJsonSync = fs.readJsonSync;
export const writeJsonSync = fs.writeJsonSync;