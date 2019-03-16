"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polyfill = polyfill;
exports.OPTIONS = void 0;

/**
 * @author absolutholz
 */

/**
 * Default options used in the polyfill
 *
 * @memberof Object Fit
 */
var OPTIONS = {
  fallbackClass: 'media__fallback',
  fallbackZIndex: 2,
  fitType: 'cover'
};
/**
 * A polyfill for CSS's object-fit of images via the use of background-image
 *
 * @memberof Object Fit
 *
 * @param {DomNode} elImage
 * @param {Object} [options = OPTIONS]
 */

exports.OPTIONS = OPTIONS;

function polyfill(elImage) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : OPTIONS;
  var elImg = elImage.nodeName.toLowerCase() === 'picture' ? elImage.querySelector('img') : elImage;
  var sSrc = elImg.currentSrc || elImg.src;

  if (sSrc) {
    var elBackgroundImage = document.createElement('div');
    elBackgroundImage.setAttribute('class', "".concat(elImage.getAttribute('class') || '', " ").concat(options.fallbackClass));
    elBackgroundImage.setAttribute('style', "\n\t\t\tbackground-image: url(".concat(sSrc, ");\n\t\t\tbackground-repeat: no-repeat;\n\t\t\tbackground-size: ").concat(options.fitType, ";\n\t\t\tbackground-position: center;\n\t\t\theight: 100%;\n\t\t\tleft: 0;\n\t\t\tposition: absolute;\n\t\t\ttop: 0;\n\t\t\twidth: 100%;\n\t\t\tz-index: ").concat(options.fallbackZIndex, ";\n\t\t"));

    if (elImg.getAttribute('alt')) {
      elBackgroundImage.setAttribute('aria-label', elImg.getAttribute('alt'));
    }

    elImage.parentNode.insertBefore(elBackgroundImage, elImg);
  }
}
//# sourceMappingURL=polyfill.js.map
