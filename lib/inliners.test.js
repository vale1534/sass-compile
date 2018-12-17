"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _nodeSass = require("node-sass");

var _inliners3 = _interopRequireDefault(require("./inliners"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

it('should encode svg to uri data', () => {
  const _inliners = (0, _inliners3["default"])(),
        inline = _inliners.inline;

  const context = {
    options: {
      file: __filename
    }
  };
  const input = new _nodeSass.types.String('test-svgs/sample1.svg');
  const result = inline.call(context, input);
  expect(result.getValue()).toBe("url(\"data:image/svg+xml;%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3e%3cpath d='M22 38V51L32 32l19-19v12C44 26 43 10 38 0 52 15 49 39 22 38z'/%3e%3c/svg%3e\")");
});

const encodedFont = _fs["default"].readFileSync(_path["default"].join(__dirname, 'test-fonts/encoded-uri.txt'), {
  encoding: 'UTF-8'
});

it('should encode font to uri data', () => {
  const _inliners2 = (0, _inliners3["default"])(),
        inline = _inliners2.inline;

  const context = {
    options: {
      file: __filename
    }
  };
  const input = new _nodeSass.types.String('test-fonts/icons-16.woff');
  const result = inline.call(context, input).getValue();
  expect(result.substr(0, 50)).toBe(encodedFont.substr(0, 50));
  expect(result.substr(-50)).toBe(encodedFont.substr(-50));
  expect(result).toMatchSnapshot();
});