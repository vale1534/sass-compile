import fs from 'fs';
import sass from 'node-sass';
import yargs from 'yargs';

import importers from './importers';
import inliners from './inliners';

const usage = [
  `Simple sass compiler, with module path importer and data uri inliners.`,
  `Usage: sass-compile [options] <input.scss> <result.css>`,
];

yargs
  .option('include', {
    alias: 'i',
    requiresArg: true,
    describe: 'Path to look for imported files and assets',
    type: 'array',
  })
  .option('output-style', {
    alias: 's',
    describe: 'CSS output style',
    requiresArg: true,
    choices: ['nested', 'expanded', 'compact', 'compressed'],
    type: 'string',
  })
  .option('indent-type', {
    describe: 'Indent type for output CSS',
    choices: ['space', 'tab'],
    requiresArg: true,
    type: 'string',
    default: 'space',
  })
  .option('indent-width', {
    describe: 'Indent width; number of spaces or tabs (maximum: 10)',
    requiresArg: true,
    type: 'number',
    default: 2,
  })
  .option('linefeed', {
    describe: 'Linefeed style',
    choices: ['cr', 'crlf', 'lf', 'lfcr'],
    requiresArg: true,
    type: 'string',
    default: 'lf',
  })
  .option('source-comments', {
    describe: 'Include debug info in output',
    type: 'boolean',
    default: false,
  })
  .option('source-map', {
    describe: 'Emit source map',
    type: 'boolean',
    default: false,
  })
  .option('source-map-contents', {
    describe: 'Embed include contents in map',
    type: 'boolean',
    default: false,
  })
  .option('source-map-embed', {
    describe: 'Embed sourceMappingUrl as data URI',
    type: 'boolean',
    default: false,
  })
  .option('source-map-root', {
    describe: 'Base path, will be emitted in source-map as is',
    type: 'string',
  })
  .option('precision', {
    describe: 'The amount of precision allowed in decimal numbers',
    type: 'number',
    default: 6,
  })
  .usage('\n' + usage.join('\n\n'))
  .strict();

function main(argv) {
  // console.log(argv);

  const args = argv._;
  if (args.length !== 2) {
    yargs.showHelp();
    return;
  }

  const argIncludes = argv.include || [];
  const includePaths = argIncludes.reduce(
    (res, path) => res.concat(path.split(';')),
    [process.cwd()]
  );

  const [infile, outfile] = args;
  const result = sass.renderSync({
    file: infile,
    includePaths: includePaths,
    functions: inliners(),
    importers: importers(),
    outputStyle: argv.outputStyle || 'compact',
    indentType: argv.indentType,
    indentWidth: argv.indentWidth,
    linefeed: argv.linefeed,
    sourceComments: argv.sourceComments,
    sourceMap: argv.sourceMap,
    sourceMapContents: argv.sourceMapContents,
    sourceMapEmbed: argv.sourceMapEmbed,
    sourceMapRoot: argv.sourceMapRoot,
    precision: argv.precision,
  });

  fs.writeFileSync(outfile, result.css);
}

main(yargs.argv);
