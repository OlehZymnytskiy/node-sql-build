function joinObject(object, sym1, sym2) {
  var result = '', comma = false;

  for (var i in object) {
    if (comma) result += sym2 || ' ';
    result += i + sym1 + object[i];
    comma = true;
  }

  return result;
}

function normalizeValue(val) {
  if (val === undefined || val === null) {
    return 'NULL';
  }

  if (typeof(val) === 'string') {
    return "'" + val + "'";
  }

  return val;
}

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

function parseWhere(p) {
  var q = '';

  switch (typeof(p.where)) {
    case 'object':
      normalizeObject(p.where);
      q += ' WHERE ' + joinObject(p.where, '=', ' AND ');
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

function normalizeIdentifier(ident) {
  return ident.split('.').map(function(i) {
    return '"' + i + '"';
  }).join('.');
}

function StringModule(Query) {
  Query.prototype.toString = Query.prototype.str = function() {
    switch (this.op) {
      case 'select':
        return require('./select').toString.call(this);
      case 'update':
        return require('./update').toString.call(this);
      case 'delete':
        return require('./delete').toString.call(this);
      case 'insert':
        return require('./insert').toString.call(this);
      default:
        throw 'unknown opration';
    }
  };
}

StringModule.parseWhere = parseWhere;
StringModule.normalizeObject = normalizeObject;
StringModule.joinObject = joinObject;
StringModule.normalizeIdentifier = normalizeIdentifier;
StringModule.normalizeValue = normalizeValue;

module.exports = StringModule;

