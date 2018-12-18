import DefaultInliner from './inliner-default';

function inliners({ inlines, ...opts }) {
  const inliner = new DefaultInliner(opts).inliner();
  const inlinerMap = { 'inline($url)': inliner };

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

export default inliners;
