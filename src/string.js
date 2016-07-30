module.exports = function(Query) {
  function join_object(object, sym1, sym2) {
    var result = '', comma = false;

    for (var i in object) {
      if (comma) result += sym2 || ' ';
      result += i + sym1 + object[i];
    }

    return result;
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
      q += ' WHERE ' + join_object(p.where, '=', ' ');
    }

    return q;
  }

  Query.prototype.toString = Query.prototype.str = function() {
    switch (this.op) {
      case 'select':
        return build_select.call(this);
      default:
        throw 'unknown opration';
    }
  };
};
