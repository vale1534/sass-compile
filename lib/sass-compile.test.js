"use strict";

var _nodeSass = _interopRequireDefault(require("node-sass"));

var _path = _interopRequireDefault(require("path"));

var _importers = _interopRequireDefault(require("./importers"));

var _inliners = _interopRequireDefault(require("./inliners"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

const expectedCss = ".with-before::before {\n  content: url(\"data:image/svg+xml;%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3e%3cpath d='M22 38V51L32 32l19-19v12C44 26 43 10 38 0 52 15 49 39 22 38z'/%3e%3c/svg%3e\"); }\n";
it('should render scss with inliners', () => {
  const infile = _path["default"].join(__dirname, 'test-scss/a/b/b.scss');

  const result = _nodeSass["default"].renderSync({
    file: infile,
    includePaths: [__dirname],
    functions: (0, _inliners["default"])(),
    importers: (0, _importers["default"])()
  });

  const resultCss = result.css.toString('UTF-8');
  expect(resultCss).toBe(expectedCss);
});