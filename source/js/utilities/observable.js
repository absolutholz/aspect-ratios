/*
	# Observer(able) Pattern

	## Helpful Links
	- [Understanding Observables in JavaScript - Part#1: Observer Pattern](http://anasfirdousi.com/understanding-observable-patterns-behind-observables-rxjs-rx.html)
*/
export function Observable() {
	const observers = [];

	/*
		Observer object MUST have a public 'update' method which is called
		by the Observable's notify function.
		Example:
			ObservableObject.addObserver({
				update: (payload) => {
					// handle payload
				},
			});
	*/
	const subscribe = function addObserver(observer) {
		observers.push(observer);
	};

	const unsubscribe = function removeObserver(observer) {
		const index = this.observers.indexOf(observer);
		this.observers.splice(index, 1);
	};

	const publish = function notifyAllObservers(payload) {
		observers.forEach((observer) => {
			observer.update(payload);
		});
	};

	return Object.freeze({
		publish,
		subscribe,
		unsubscribe,
	});
}
