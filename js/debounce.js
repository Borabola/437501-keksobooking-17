'use strict';
var DEBOUNCE_INTERVAL = 300; // ms

/**
 * @param {function} cb
 * @return {Function}
 */
window.debounce = function (cb) {
  var lastTimeout = null;

  return function () {
    var parameters = arguments;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb.apply(null, parameters);
    }, DEBOUNCE_INTERVAL);
  };
};
