"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Observable = Observable;

/**
 * Observer(able) Pattern
 *
 * Helpful Links
 * - [Understanding Observables in JavaScript - Part#1: Observer Pattern](http://anasfirdousi.com/understanding-observable-patterns-behind-observables-rxjs-rx.html)
 *
 * Observer object MUST have a public 'update' method which is called by the Observable's notify function.
 * @example
 *  ObservableObject.addObserver({
 *  	update: (payload) => {
 *  		// handle payload
 *  	},
 *  });
 */
function Observable() {
  var observers = [];
  /*
  		Example:
  	*/

  var subscribe = function addObserver(observer) {
    observers.push(observer);
  };

  var unsubscribe = function removeObserver(observer) {
    var index = this.observers.indexOf(observer);
    this.observers.splice(index, 1);
  };

  var publish = function notifyAllObservers(payload) {
    observers.forEach(function (observer) {
      observer.update(payload);
    });
  };

  return Object.freeze({
    publish: publish,
    subscribe: subscribe,
    unsubscribe: unsubscribe
  });
}
//# sourceMappingURL=observable.js.map
