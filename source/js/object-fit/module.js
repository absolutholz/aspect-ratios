/**
 * @namespace Object Fit
 * @author absolutholz
 */

import polyfill from './polyfill';
import isSupportedNatively from './support';

export function ObjectFitImage(elImage) {
	const initialize = function initializeBaseFunctionality() {
		if (!isSupportedNatively()) {
			polyfill(elImage);
		}
	};

	return Object.freeze({
		initialize,
	});
}

export function init(elPattern) {
	ObjectFitImage(elPattern).initialize();
}
