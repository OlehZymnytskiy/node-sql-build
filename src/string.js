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
      switch (typeof(p.where)) {
        case 'object':
          q += ' WHERE ' + join_object(p.where, '=', ' ');
          break;
        case 'string':
          var w = p.where, m;
          while ((m = w.match(/[ ]+[=><(>=)(<=)][ ]+/))) {
            w = w.replace(m[0], m[0].replace(/[ ]/g, ''));
          }
          q += ' WHERE ' + w;
          break;
        default:
          throw 'bad where statement';
      }
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
