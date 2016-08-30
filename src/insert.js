var normalizeIdentifier = require('./string').normalizeIdentifier;
var normalizeValue = require('./string').normalizeValue;

var InsertModule = function(Query) {
  Query.method('insert', function() {
    this.op = 'insert';
    return this;
  });

  Query.method('into', function(into) {
    this.p.into = into;
    return this;
  });

  Query.method('values', function() {
    if (arguments.length === 1 && Array.isArray(arguments[0])) {
      this.p.values = arguments[0];
      return this;
    }
    if (arguments.length) {
      this.p.values = Array.from(arguments);
    }
    return this;
  });

  Query.method('returning', function() {
    if (arguments.length) {
      if (typeof(arguments[0]) === 'object') {
        this.p.returning = arguments[0];
      } else {
        this.p.returning = Array.from(arguments).map(function(f) {
          return { name: f };
        });
      }
    } else {
      this.p.returning = [{ name: '*' }];
    }
    return this;
  });

  Query.method('as', function(name) {
    if (this.last === 'returning') {
      this.p.returning[0].as = name;
    } else throw new Error('enexpected');
    return this;
  });
};

function getUniqueValues(values) {
  var vals = [];

  for (var i in values) {
    for (var value in values[i]) {
      if (vals.indexOf(value) === -1) {
        vals.push(value);
      }
    }
  }

  return vals;
}

InsertModule.toString = function() {
  var q = 'INSERT INTO';
  var p = this.p;

  if (!p.into) {
    throw new Error('No table specified');
  }

  if (!p.values) {
    throw new Error('No values specified');
  }

  q += ' ' + normalizeIdentifier(p.into);

  var values = getUniqueValues(p.values);
  q += ' (' + values.map(function(val) {
    return normalizeIdentifier(val);
  }).join(', ') + ')';

  q += ' VALUES';
  var rows = [];
  for (var i in p.values) {
    var value = p.values[i];
    var ordered = [];
    for (var j in values) {
      ordered.push(normalizeValue(value[values[j]]));
    }
    rows.push('(' + ordered.join(', ') + ')');
  }
  q += rows.join(', ');

  if (p.returning) {
    q += ' RETURNING ' + p.returning.map(function(f) {
      function norm(f) {
        return f === '*' ? '*' : '"' + f + '"';
      }

      if (f.as) {
        return norm(f.name) + ' AS ' + norm(f.as);
      }

      return norm(f.name);
    }).join(', ');
  }

  return q;
};

module.exports = InsertModule;

