import DefaultInliner from './inliner-default';

function inliners(opts = {}) {
  const inliner1 = new DefaultInliner(opts);
  return { inline: inliner1.inliner() };
}

export default inliners;
