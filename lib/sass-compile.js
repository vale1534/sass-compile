"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _nodeSass = _interopRequireDefault(require("node-sass"));

var _yargs = _interopRequireDefault(require("yargs"));

var _importers = _interopRequireDefault(require("./importers"));

var _inliners = _interopRequireDefault(require("./inliners"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const usage = ["Simple sass compiler, with module path importer and data uri inliners.", "Usage: sass-compile [options] <input.scss> <result.css>"];

_yargs["default"].option('include', {
  alias: 'i',
  requiresArg: true,
  describe: 'Path to look for imported files and assets',
  type: 'array'
}).option('output-style', {
  alias: 's',
  describe: 'CSS output style',
  requiresArg: true,
  choices: ['nested', 'expanded', 'compact', 'compressed'],
  type: 'string'
}).option('indent-type', {
  describe: 'Indent type for output CSS',
  choices: ['space', 'tab'],
  requiresArg: true,
  type: 'string',
  "default": 'space'
}).option('indent-width', {
  describe: 'Indent width; number of spaces or tabs (maximum: 10)',
  requiresArg: true,
  type: 'number',
  "default": 2
}).option('linefeed', {
  describe: 'Linefeed style',
  choices: ['cr', 'crlf', 'lf', 'lfcr'],
  requiresArg: true,
  type: 'string',
  "default": 'lf'
}).option('source-comments', {
  describe: 'Include debug info in output',
  type: 'boolean',
  "default": false
}).option('source-map', {
  describe: 'Emit source map',
  type: 'boolean',
  "default": false
}).option('source-map-contents', {
  describe: 'Embed include contents in map',
  type: 'boolean',
  "default": false
}).option('source-map-embed', {
  describe: 'Embed sourceMappingUrl as data URI',
  type: 'boolean',
  "default": false
}).option('source-map-root', {
  describe: 'Base path, will be emitted in source-map as is',
  type: 'string'
}).option('precision', {
  describe: 'The amount of precision allowed in decimal numbers',
  type: 'number',
  "default": 6
}).usage('\n' + usage.join('\n\n')).strict();

function main(argv) {
  // console.log(argv);
  const args = argv._;

  if (args.length !== 2) {
    _yargs["default"].showHelp();

    return;
  }

  const argIncludes = argv.include || [];
  const includePaths = argIncludes.reduce((res, path) => res.concat(path.split(';')), [process.cwd()]);

  const _args = _slicedToArray(args, 2),
        infile = _args[0],
        outfile = _args[1];

  const result = _nodeSass["default"].renderSync({
    file: infile,
    includePaths: includePaths,
    functions: (0, _inliners["default"])(),
    importers: (0, _importers["default"])(),
    outputStyle: argv.outputStyle || 'compact',
    indentType: argv.indentType,
    indentWidth: argv.indentWidth,
    linefeed: argv.linefeed,
    sourceComments: argv.sourceComments,
    sourceMap: argv.sourceMap,
    sourceMapContents: argv.sourceMapContents,
    sourceMapEmbed: argv.sourceMapEmbed,
    sourceMapRoot: argv.sourceMapRoot,
    precision: argv.precision
  });

  _fs["default"].writeFileSync(outfile, result.css);
}

main(_yargs["default"].argv);