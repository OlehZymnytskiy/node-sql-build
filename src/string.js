module.exports = function(Query) {
  function normalize_object(obj) {
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

  function join_object(object, sym1, sym2) {
    var result = '', comma = false;

    for (var i in object) {
      if (comma) result += sym2 || ' ';
      result += i + sym1 + object[i];
    }

    return result;
  }

  function parse_where(p) {
    var q = '';

    switch (typeof(p.where)) {
      case 'object':
        normalize_object(p.where);
        q += ' WHERE ' + join_object(p.where, '=', ' ');
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

  function build_select() {
    var q = 'SELECT',
      p = this.p;

    if (p.distinct) {
      q += ' DISTINCT';
    }

    if (typeof(p.select) === 'string') {
      q += ' ' + p.select;
    } else {
      throw 'no select';
    }

    q += ' FROM';
    if (typeof(p.from) === 'string') {
      q += ' ' + p.from;
    } else {
      throw 'no from';
    }

    if (p.where) {
      q += parse_where(p);
    }

    return q;
  }

  function build_update() {
    var q = 'UPDATE',
      p = this.p;

    if (typeof(p.update) === 'string') {
      q += ' ' + p.update;
    } else {
      throw 'no update';
    }

    if (typeof(p.set) === 'object') {
      normalize_object(p.set);
      q += ' SET ' + join_object(p.set, '=', ' ');
    } else {
      throw 'no set';
    }

    if (p.where) {
      q += parse_where(p);
    }

    return q;
  }

  function build_delete() {
    var q = 'DELETE FROM',
      p = this.p;

    if (typeof(p.from) === 'string') {
      q += ' ' + p.from;
    } else {
      throw 'no from';
    }

    if (p.where) {
      q += parse_where(p);
    }

    return q;
  }

  Query.prototype.toString = Query.prototype.str = function() {
    switch (this.op) {
      case 'select':
        return build_select.call(this);
      case 'update':
        return build_update.call(this);
      case 'delete':
        return build_delete.call(this);
      default:
        throw 'unknown opration';
    }
  };
};
