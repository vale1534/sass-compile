import sass from 'node-sass';
import path from 'path';

import importers from './importers';
import inliners from './inliners';

const expectedCss = `.with-before::before {
  content: url(\"data:image/svg+xml;%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3e%3cpath d='M22 38V51L32 32l19-19v12C44 26 43 10 38 0 52 15 49 39 22 38z'/%3e%3c/svg%3e\"); }
`;

it('should render scss with inliners', () => {
  const infile = path.join(__dirname, 'test-scss/a/b/b.scss');
  const result = sass.renderSync({
    file: infile,
    includePaths: [__dirname],
    functions: inliners(),
    importers: importers(),
  });

  const resultCss = result.css.toString('UTF-8');
  expect(resultCss).toBe(expectedCss);
});
