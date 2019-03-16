"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectFitImage = ObjectFitImage;
exports.init = init;

var _polyfill = _interopRequireDefault(require("./polyfill"));

var _support = _interopRequireDefault(require("./support"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @namespace Object Fit
 * @author absolutholz
 */
function ObjectFitImage(elImage) {
  var initialize = function initializeBaseFunctionality() {
    if (!(0, _support.default)()) {
      (0, _polyfill.default)(elImage);
    }
  };

  return Object.freeze({
    initialize: initialize
  });
}

function init(elPattern) {
  ObjectFitImage(elPattern).initialize();
}
//# sourceMappingURL=module.js.map
