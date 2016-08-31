var defineFunc = require('./util').defineFunc,
  normalizeObject = require('./string').normalizeObject,
  joinObject = require('./string').joinObject,
  parseWhere = require('./string').parseWhere;

function UpdateModule(Query) {
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
}

UpdateModule.toString = function() {
  var q = 'UPDATE',
    p = this.p;

  if (typeof(p.table) === 'string' && p.table) {
    q += ' "' + p.table + '"';
  } else {
    throw new Error('No table specified');
  }

  if (typeof(p.set) === 'object') {
    q += ' SET ' + joinObject(normalizeObject(p.set), '=', ', ');
  } else {
    throw 'no set';
  }

  if (p.where) {
    q += parseWhere(p);
  }

  return q;
};

module.exports = UpdateModule;

