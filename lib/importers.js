"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _importerDefault = _interopRequireDefault(require("./importer-default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function importers(opts = {}) {
  const imp1 = new _importerDefault["default"](opts);
  return [imp1.importer()];
}

var _default = importers;
exports["default"] = _default;