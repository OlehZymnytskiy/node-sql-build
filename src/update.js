var defineFunc = require('./util').defineFunc;

module.exports = function(Query) {
  defineFunc(Query, 'update', function() {
    this.op = 'update';
    return this;
  });

  defineFunc(Query, 'table', function(table) {
    this.p.table = table;
    return this;
  });

  defineFunc(Query, 'set', function(object) {
    this.p.set = object;
    return this;
  });

  // use where from select.js
};

