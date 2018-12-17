"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _inlinerDefault = _interopRequireDefault(require("./inliner-default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function inliners(opts = {}) {
  const inliner1 = new _inlinerDefault["default"](opts);
  return {
    inline: inliner1.inliner()
  };
}

var _default = inliners;
exports["default"] = _default;