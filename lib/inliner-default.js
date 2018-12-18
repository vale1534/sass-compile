"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _mimeTypes = _interopRequireDefault(require("mime-types"));

var _nodeSass = require("node-sass");

var _utils = require("./utils");

var _optimizeSvgData = _interopRequireDefault(require("./optimizeSvgData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const REGEX = {
  lineBreaks: /[\r\n]+/g,
  spaces: /\s+/g,
  xmlComment: /(<!--.*?-->)|(<!--[\w\W\n\s]+?-->)/g
};

class DefaultInliner {
  constructor(opts = {}) {
    _defineProperty(this, "inlinerInternal", (ctx, url) => {
      const inputPath = _path["default"].dirname(ctx.options.file); // console.dir(ctx);
      // Try include and module paths


      const optPaths = ctx.options.includePaths || '';
      const includePaths = [...new Set([inputPath, ...optPaths.split(';'), ..._utils.modulePaths, process.cwd()])].filter(path => path);
      let file = null;
      includePaths.forEach(findPath => {
        if (file) return; // console.log(findPath, url);

        file = (0, _utils.getFile)(findPath, url);
      });
      if (!file) throw Error('File not found. ' + url);

      const mime = _mimeTypes["default"].lookup(file);

      let uriData = _fs["default"].readFileSync(file);

      if (mime === 'image/svg+xml') {
        uriData = uriData.toString('UTF-8').replace(REGEX.lineBreaks, ' ').replace(REGEX.xmlComment, '').replace(REGEX.spaces, ' ').trim();
        uriData = (0, _optimizeSvgData["default"])(encodeURIComponent(uriData));
        return "url(\"data:image/svg+xml;".concat(uriData, "\")");
      }

      uriData = uriData.toString('base64');
      return "url(\"data:".concat(mime, ";base64,").concat(uriData, "\")");
    });

    _defineProperty(this, "inliner", () => {
      const self = this;
      return function (url) {
        const urlValue = url.getValue();
        const result = self.inlinerInternal(this, urlValue);
        return result ? _nodeSass.types.String(result) : _nodeSass.types.Null();
      };
    });

    this.options = _objectSpread({}, opts);
    this.cache = {};
  }

}

var _default = DefaultInliner;
exports["default"] = _default;