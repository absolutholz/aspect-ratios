/**
 * Check if the browser natively supports CSS's object-fit
 *
 * @memberof Object Fit
 * @author absolutholz
 */
export function isSupportedNatively() {
	return 'objectFit' in document.documentElement.style;
}
