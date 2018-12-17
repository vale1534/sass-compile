import DefaultImporter from './importer-default';

function importers(opts = {}) {
  const imp1 = new DefaultImporter(opts);
  return [imp1.importer()];
}

export default importers;
