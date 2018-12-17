import fs from 'fs';
import path from 'path';

// join filepaths and check if exists
export function getFile(...filepaths) {
  const file = path.join(...filepaths);
  // console.log('----' + file);
  return fs.existsSync(file) && fs.statSync(file).isFile() ? file : null;
}

// get moduel paths
export function getModulePaths() {
  let base = process.cwd();
  let modulePaths = [];
  while (fs.existsSync(base)) {
    const dst = path.join(base, 'node_modules');
    if (fs.existsSync(dst)) modulePaths.push(dst);
    const parent = path.dirname(base);
    if (parent === base) break;
    base = parent;
  }
  return modulePaths;
}

export const modulePaths = getModulePaths();
