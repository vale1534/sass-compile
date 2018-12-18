"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _inlinerDefault = _interopRequireDefault(require("./inliner-default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function inliners(_ref) {
  let inlines = _ref.inlines,
      opts = _objectWithoutProperties(_ref, ["inlines"]);

  const inliner = new _inlinerDefault["default"](opts).inliner();
  const inlinerMap = {
    'inline($url)': inliner
  };
  if (!inlines) return inlinerMap;

  if (typeof inlines === 'string') {
    inlinerMap[inlines] = inliner;
    return inlinerMap;
  }

  inlines.forEach(k => {
    inlinerMap[k] = inliner;
  });
  return inlinerMap;
}

var _default = inliners;
exports["default"] = _default;