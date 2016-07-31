module.exports = function(Query) {
  function normalizeObject(obj) {
    for (var i in obj) {
      if (typeof(obj[i]) === 'string') {
        if (isNaN(parseFloat(obj[i]))) {
          obj[i] = "'" + obj[i] + "'";
        } else {
          obj[i] = parseFloat(obj[i]);
        }
      }
    }
  }

  function joinObject(object, sym1, sym2) {
    var result = '', comma = false;

    for (var i in object) {
      if (comma) result += sym2 || ' ';
      result += i + sym1 + object[i];
    }

    return result;
  }

  function parseWhere(p) {
    var q = '';

    switch (typeof(p.where)) {
    case 'object':
      normalizeObject(p.where);
      q += ' WHERE ' + joinObject(p.where, '=', ' ');
      break;
    case 'string':
      var w = p.where, m;
      while ((m = w.match(/[ ]+([=><]|<=|>=)[ ]+/))) {
        w = w.replace(m[0], m[0].replace(/[ ]/g, ''));
      }
      q += ' WHERE ' + w;
      break;
    default:
      throw 'bad where statement';
    }

    return q;
  }

  function buildSelect() {
    var q = 'SELECT',
      p = this.p;

    if (p.distinct) {
      q += ' DISTINCT';
    }

    if (!p.fields.length) {
      q += ' *';
    } else {
      q += ' ' + p.fields.join(', ');
    }

    q += ' FROM';
    if (typeof(p.from) === 'string') {
      q += ' ' + p.from;
    } else {
      throw 'no from';
    }

    if (p.where) {
      q += parseWhere(p);
    }

    return q;
  }

  function buildUpdate() {
    var q = 'UPDATE',
      p = this.p;

    if (typeof(p.table) === 'string') {
      q += ' ' + p.table;
    } else {
      throw new Error('No table specified');
    }

    if (typeof(p.set) === 'object') {
      normalizeObject(p.set);
      q += ' SET ' + joinObject(p.set, '=', ' ');
    } else {
      throw 'no set';
    }

    if (p.where) {
      q += parseWhere(p);
    }

    return q;
  }

  function buildDelete() {
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
  }

  Query.prototype.toString = Query.prototype.str = function() {
    switch (this.op) {
    case 'select':
      return buildSelect.call(this);
    case 'update':
      return buildUpdate.call(this);
    case 'delete':
      return buildDelete.call(this);
    default:
      throw 'unknown opration';
    }
  };
};
