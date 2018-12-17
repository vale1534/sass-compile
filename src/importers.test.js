import path from 'path';
import importers from './importers';

const relativeFile1 = path.join(__dirname, 'test-scss/a/_a1.scss');
const relativeFile2 = path.join(__dirname, 'test-scss/a/b/b.scss');
const moduleFile = path.join(__dirname, '../node_modules/yargs/lib/command.js');

it('should resolve relative filepath', () => {
  const [importer1] = importers();
  const context = { options: {} };

  let result = importer1.call(context, 'test-scss/a/a1', __filename);
  expect(result).toHaveProperty('file');
  expect(path.normalize(result.file)).toBe(path.normalize(relativeFile1));

  const { file } = importer1.call(context, 'b/b', result.file);
  expect(path.normalize(file)).toBe(path.normalize(relativeFile2));
});

it('should resolve module filepath', () => {
  const [importer1] = importers();
  const context = { options: {} };
  const { file } = importer1.call(context, 'yargs/lib/command.js', __filename);
  expect(path.normalize(file)).toBe(path.normalize(moduleFile));
});
