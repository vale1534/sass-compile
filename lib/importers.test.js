"use strict";

var _path = _interopRequireDefault(require("path"));

var _importers5 = _interopRequireDefault(require("./importers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const relativeFile1 = _path["default"].join(__dirname, 'test-scss/a/_a1.scss');

const relativeFile2 = _path["default"].join(__dirname, 'test-scss/a/b/b.scss');

const moduleFile = _path["default"].join(__dirname, '../node_modules/yargs/lib/command.js');

it('should resolve relative filepath', () => {
  const _importers = (0, _importers5["default"])(),
        _importers2 = _slicedToArray(_importers, 1),
        importer1 = _importers2[0];

  const context = {
    options: {}
  };
  let result = importer1.call(context, 'test-scss/a/a1', __filename);
  expect(result).toHaveProperty('file');
  expect(_path["default"].normalize(result.file)).toBe(_path["default"].normalize(relativeFile1));

  const _importer1$call = importer1.call(context, 'b/b', result.file),
        file = _importer1$call.file;

  expect(_path["default"].normalize(file)).toBe(_path["default"].normalize(relativeFile2));
});
it('should resolve module filepath', () => {
  const _importers3 = (0, _importers5["default"])(),
        _importers4 = _slicedToArray(_importers3, 1),
        importer1 = _importers4[0];

  const context = {
    options: {}
  };

  const _importer1$call2 = importer1.call(context, 'yargs/lib/command.js', __filename),
        file = _importer1$call2.file;

  expect(_path["default"].normalize(file)).toBe(_path["default"].normalize(moduleFile));
});