var defineFunc = require('./util').defineFunc;

module.exports = function(Query) {
  defineFunc(Query, 'delete', function() {
    this.op = 'delete';
    return this;
  });

  // use from from select
  // use where from select
};

