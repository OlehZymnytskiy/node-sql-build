'use strict';

module.exports = {
  defineFunc: function(object, name, func) {
    Object.defineProperty(object.prototype, name, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: func,
    });
  },
  defineGetter: function(object, name, func) {
    Object.defineProperty(object.prototype, name, {
      enumerable: false,
      configurable: false,
      get: func,
    });
  },
};

