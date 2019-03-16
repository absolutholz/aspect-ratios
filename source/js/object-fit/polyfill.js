/**
 * @author absolutholz
 */

/**
 * Default options used in the polyfill
 *
 * @memberof Object Fit
 */
export const OPTIONS = {
	fallbackClass: 'media__fallback',
	fallbackZIndex: 2,
	fitType: 'cover',
};

/**
 * A polyfill for CSS's object-fit of images via the use of background-image
 *
 * @memberof Object Fit
 *
 * @param {DomNode} elImage
 * @param {Object} [options = OPTIONS]
 */
export function polyfill(elImage, options = OPTIONS) {
	const elImg = elImage.nodeName.toLowerCase() === 'picture' ? elImage.querySelector('img') : elImage;
	const sSrc = elImg.currentSrc || elImg.src;

	if (sSrc) {
		const elBackgroundImage = document.createElement('div');
		elBackgroundImage.setAttribute('class', `${elImage.getAttribute('class') || ''} ${options.fallbackClass}`);
		elBackgroundImage.setAttribute('style', `
			background-image: url(${sSrc});
			background-repeat: no-repeat;
			background-size: ${options.fitType};
			background-position: center;
			height: 100%;
			left: 0;
			position: absolute;
			top: 0;
			width: 100%;
			z-index: ${options.fallbackZIndex};
		`);
		if (elImg.getAttribute('alt')) {
			elBackgroundImage.setAttribute('aria-label', elImg.getAttribute('alt'));
		}
		elImage.parentNode.insertBefore(elBackgroundImage, elImg);
	}
}
