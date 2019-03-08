/**
 * @author Remy Sharp
 *
 * @link https://remysharp.com/2010/07/21/throttling-function-calls/
 */
export function throttle(fn, threshhold, scope) {
	// eslint-disable-next-line
	threshhold || (threshhold = 250);

	let last;
	let deferTimer;

	return (...args) => {
		const context = scope || this;

		const now = +new Date();
		if (last && now < last + threshhold) {
			// hold on to it
			clearTimeout(deferTimer);
			deferTimer = setTimeout(() => {
				last = now;
				fn.apply(context, args);
			}, threshhold);
		} else {
			last = now;
			fn.apply(context, args);
		}
	};
}
