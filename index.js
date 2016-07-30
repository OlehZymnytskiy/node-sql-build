function Query() {
  this.p = {}; // for params
}

require('./src/select')(Query);
require('./src/string')(Query);

module.exports = Query;

