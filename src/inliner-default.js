import path from 'path';
import fs from 'fs';
import mimeTypes from 'mime-types';
import { types } from 'node-sass';

import { getFile, modulePaths } from './utils';
import optimizeSvgData from './optimizeSvgData';

const REGEX = {
  lineBreaks: /[\r\n]+/g,
  spaces: /\s+/g,
};

class DefaultInliner {
  constructor(opts = {}) {
    this.options = {
      ...opts,
    };
    this.cache = {};
  }

  inlinerInternal = (ctx, url) => {
    const inputPath = path.dirname(ctx.options.file);

    // console.dir(ctx);

    // Try include and module paths
    const optPaths = ctx.options.includePaths || '';
    const includePaths = [
      ...new Set([
        inputPath,
        ...optPaths.split(';'),
        ...modulePaths,
        process.cwd(),
      ]),
    ].filter(path => path);

    let file = null;
    includePaths.forEach(findPath => {
      if (file) return;
      // console.log(findPath, url);
      file = getFile(findPath, url);
    });

    if (!file) throw Error('File not found. ' + url);

    const mime = mimeTypes.lookup(file);
    let uriData = fs.readFileSync(file);

    if (mime === 'image/svg+xml') {
      uriData = uriData
        .toString('UTF-8')
        .replace(REGEX.lineBreaks, ' ')
        .replace(REGEX.spaces, ' ');
      uriData = optimizeSvgData(encodeURIComponent(uriData));
      return `url("data:image/svg+xml;${uriData}")`;
    }

    uriData = uriData.toString('base64');
    return `url("data:${mime};base64,${uriData}")`;
  };

  inliner = () => {
    const self = this;
    return function(url) {
      const urlValue = url.getValue();
      const result = self.inlinerInternal(this, urlValue);
      return types.String(result);
    };
  };
}

export default DefaultInliner;
