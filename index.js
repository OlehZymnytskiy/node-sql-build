function Query() {
  this.p = {}; // for params
}

require('./src/select')(Query);
require('./src/insert')(Query);
require('./src/update')(Query);
require('./src/delete')(Query);
require('./src/string')(Query);

function createQuery(type) {
  return function() {
    var q = new Query();
    return q[type]();
  };
}

module.exports = {
  select: createQuery('select'),
  insert: createQuery('insert'),
  update: createQuery('update'),
  delete: createQuery('delete'),
};

