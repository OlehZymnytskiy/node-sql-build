var defineFunc = require('./util').defineFunc,
  defineGetter = require('./util').defineGetter;

module.exports = function(Query) {
  defineFunc(Query, 'select', function() {
    this.op = 'select';
    this.p.fields = [];
    return this;
  });

  defineFunc(Query, 'field', function(field) {
    this.p.fields.push(field);
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
    } else if (typeof(where) === 'string' && arguments.length >= 2) {
      var w = where, i=1;
      while (w.indexOf('?') !== -1) {
        w = w.replace(/[?]/, arguments[i++]);
      }
      this.p.where = w;
    }

    return this;
  });
};

