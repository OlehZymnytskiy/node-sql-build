var defineFunc = require('./util').defineFunc,
  defineGetter = require('./util').defineGetter;

module.exports = function(Query) {
  defineGetter(Query, 'delete', function() {
    this.op = 'delete';
    return this;
  });

  // use from from select
  // use where from select
};

