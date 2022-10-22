import {EventEmitter} from "@angular/core";
import {Subscription} from "rxjs";

function bindPropertyToEventEmitter<TClass,
	TKey extends keyof TClass,
	TProp extends TClass[TKey]> (
	t: TClass,
	propName: TKey,
	eventEmitter: EventEmitter<TProp>
): Subscription {
	return eventEmitter.subscribe((propVal: TProp) => {
		t[propName] = propVal;
	});
}

export default bindPropertyToEventEmitter;

export {bindPropertyToEventEmitter};
