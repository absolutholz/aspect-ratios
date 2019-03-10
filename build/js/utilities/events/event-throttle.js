"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttle = throttle;

/**
 * @author Remy Sharp
 *
 * @link https://remysharp.com/2010/07/21/throttling-function-calls/
 */
function throttle(fn, threshhold, scope) {
  var _this = this;

  // eslint-disable-next-line
  threshhold || (threshhold = 250);
  var last;
  var deferTimer;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = scope || _this;
    var now = +new Date();

    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
//# sourceMappingURL=event-throttle.js.map
