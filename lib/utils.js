"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFile = getFile;
exports.getModulePaths = getModulePaths;
exports.modulePaths = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// join filepaths and check if exists
function getFile(...filepaths) {
  const file = _path["default"].join(...filepaths); // console.log('----' + file);


  return _fs["default"].existsSync(file) && _fs["default"].statSync(file).isFile() ? file : null;
} // get moduel paths


function getModulePaths() {
  let base = process.cwd();
  let modulePaths = [];

  while (_fs["default"].existsSync(base)) {
    const dst = _path["default"].join(base, 'node_modules');

    if (_fs["default"].existsSync(dst)) modulePaths.push(dst);

    const parent = _path["default"].dirname(base);

    if (parent === base) break;
    base = parent;
  }

  return modulePaths;
}

const modulePaths = getModulePaths();
exports.modulePaths = modulePaths;