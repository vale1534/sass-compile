"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// wrap file as object
function retfile(file) {
  return {
    file: file.replace(/\.css$/, '')
  };
}

class DefaultImporter {
  constructor(opts = {}) {
    _defineProperty(this, "importInternal", (ctx, url, prev) => {
      const urlParts = url.split(/\//);
      const underUrl = urlParts.concat('_' + urlParts.pop()).join('/');

      const relativePath = _path["default"].dirname(prev);

      let targetUrls = [underUrl + '.scss', underUrl + '.sass', underUrl, url + '.scss', url + '.sass', url];
      let file = null; // Special case: '~/' is home path

      if (url.startsWith('~/')) {
        targetUrls.forEach(url => {
          if (file) return;
          file = (0, _utils.getFile)(url);
        });
        return file ? retfile(file) : null;
      } // Remove './' prefix


      targetUrls = targetUrls.filter(url => url).map(url => url.startsWith('./') ? url.substr(2) : url); // Relative path first

      targetUrls.forEach(url => {
        if (file) return;
        file = (0, _utils.getFile)(relativePath, url);
      });
      if (file) return retfile(file); // Replace head words as required

      targetUrls = targetUrls.map(url => {
        const maps = this.options.maps;
        let resultUrl = url;
        Object.keys(this.options.maps).forEach(key => {
          if (url.startsWith(key)) {
            const len = key.length;
            resultUrl = maps[key] + url.substr(len);
          }
        });
        return resultUrl;
      }); // Remove '~' before resolve

      targetUrls = targetUrls.map(url => url.startsWith('~') ? url.substr(1) : url); // Try include and module paths

      const optPaths = ctx.options.includePaths || '';
      const includePaths = [...new Set([relativePath, ...optPaths.split(';'), ..._utils.modulePaths, process.cwd()])].filter(path => path); // console.log('> url:', url);
      // console.log('> files:', targetUrls);
      // console.log('> paths:', includePaths);

      includePaths.forEach(path => {
        if (file) return;
        targetUrls.forEach(url => {
          if (file) return;
          file = (0, _utils.getFile)(path, url);
        });
      });
      return file ? retfile(file) : null;
    });

    _defineProperty(this, "importer", () => {
      const self = this;
      return function (url, prev) {
        // console.log('resolving ' + url);
        const result = self.importInternal(this, url, prev); // console.log('result: ', result && result.file);

        return result;
      };
    });

    this.options = _objectSpread({
      maps: {}
    }, opts);
  }

}

var _default = DefaultImporter;
exports["default"] = _default;