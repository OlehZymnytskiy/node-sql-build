var defineFunc = require('./util').defineFunc,
  defineGetter = require('./util').defineGetter;

module.exports = function(Query) {
  defineFunc(Query, 'update', function(table) {
    this.op = 'update';
    this.p.update = table;
    return this;
  });

  defineFunc(Query, 'set', function(object) {
    this.p.set = object;
    return this;
  });

  // use where from select.js
};

