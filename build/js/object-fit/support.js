"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSupportedNatively = isSupportedNatively;

/**
 * Check if the browser natively supports CSS's object-fit
 *
 * @memberof Object Fit
 * @author absolutholz
 */
function isSupportedNatively() {
  return 'objectFit' in document.documentElement.style;
}
//# sourceMappingURL=support.js.map
