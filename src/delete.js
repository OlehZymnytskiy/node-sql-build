var defineFunc = require('./util').defineFunc,
  parseWhere = require('./string').parseWhere;

function DeleteModule(Query) {
  defineFunc(Query, 'delete', function() {
    this.op = 'delete';
    return this;
  });

  // use from from select
  // use where from select
}

DeleteModule.toString = function() {
  var q = 'DELETE FROM',
    p = this.p;

  if (typeof(p.from) === 'string') {
    q += ' ' + p.from;
  } else {
    throw 'no from';
  }

  if (p.where) {
    q += parseWhere(p);
  }

  return q;
};

module.exports = DeleteModule;

