function Query() {
  this.p = {}; // for params
}

Query.method = function(name, action) {
  Object.defineProperty(Query.prototype, name, {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function() {
      var result = action.apply(this, arguments);
      this.last = name;
      return result;
    },
  });
};

require('./src/select')(Query);
require('./src/insert')(Query);
require('./src/update')(Query);
require('./src/delete')(Query);
require('./src/string')(Query);

function createQuery(type) {
  return function() {
    var q = new Query();
    return q[type].apply(q, arguments);
  };
}

module.exports = {
  select: createQuery('select'),
  insert: createQuery('insert'),
  update: createQuery('update'),
  delete: createQuery('delete'),
};

