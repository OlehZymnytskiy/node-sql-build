var defineFunc = require('./util').defineFunc;

module.exports = function(Query) {
  defineFunc(Query, 'insert', function() {
    this.op = 'insert';
    return this;
  });
};

