import path from 'path';

import { getFile, modulePaths } from './utils';

// wrap file as object
function retfile(file) {
  return { file: file.replace(/\.css$/, '') };
}

class DefaultImporter {
  constructor(opts = {}) {
    this.options = {
      maps: {},
      ...opts,
    };
  }

  importInternal = (ctx, url, prev) => {
    const urlParts = url.split(/\//);
    const underUrl = urlParts.concat('_' + urlParts.pop()).join('/');
    const relativePath = path.dirname(prev);

    let targetUrls = [
      underUrl + '.scss',
      underUrl + '.sass',
      underUrl,
      url + '.scss',
      url + '.sass',
      url,
    ];

    let file = null;
    
    // Special case: '~/' is home path
    if (url.startsWith('~/')) {
      targetUrls.forEach(url => {
        if (file) return;
        file = getFile(url);
      });
      return file ? retfile(file) : null;
    }

    // Remove './' prefix
    targetUrls = targetUrls
      .filter(url => url)
      .map(url => (url.startsWith('./') ? url.substr(2) : url));

    // Relative path first
    targetUrls.forEach(url => {
      if (file) return;
      file = getFile(relativePath, url);
    });

    if (file) return retfile(file);

    // Map replacements as required
    const { maps } = this.options;
    targetUrls = targetUrls.map(url => {
      let resultUrl = url;
      Object.keys(maps).forEach(key => {
        if (url.startsWith(key)) {
          const len = key.length;
          resultUrl = maps[key] + url.substr(len);
        }
      });
      return resultUrl;
    });

    // Remove '~' before resolve
    targetUrls = targetUrls.map(url =>
      url.startsWith('~') ? url.substr(1) : url
    );

    // Try include and module paths
    const optPaths = ctx.options.includePaths || '';
    const includePaths = [
      ...new Set([
        relativePath,
        ...optPaths.split(';'),
        ...modulePaths,
        process.cwd(),
      ]),
    ].filter(path => path);

    // console.log('> url:', url);
    // console.log('> files:', targetUrls);
    // console.log('> paths:', includePaths);

    includePaths.forEach(path => {
      if (file) return;
      targetUrls.forEach(url => {
        if (file) return;
        file = getFile(path, url);
      });
    });

    return file ? retfile(file) : null;
  };

  importer = () => {
    const self = this;
    return function(url, prev) {
      // console.log('resolving ' + url);
      const result = self.importInternal(this, url, prev);
      // console.log('result: ', result && result.file);
      return result;
    };
  };
}

export default DefaultImporter;
