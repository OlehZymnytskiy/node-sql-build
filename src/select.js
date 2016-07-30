var defineFunc = require('./util').defineFunc,
  defineGetter = require('./util').defineGetter;

module.exports = function(Query) {
  defineFunc(Query, 'select', function(select) {
    this.op = 'select';

    if (typeof(select) === 'string') {
      this.p.select = select;
    }

    return this;
  });

  defineGetter(Query, 'distinct', function() {
    this.p.distinct = true;
    return this;
  });

  defineFunc(Query, 'from', function(from) {
    if (typeof(from) === 'string') {
      this.p.from = from;
    }

    return this;
  });

  defineFunc(Query, 'where', function(where) {
    if (typeof(where) === 'object') {
      this.p.where = where;
    }

    return this;
  });
};

