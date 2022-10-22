import {EventEmitter} from "@angular/core";
import {Subscription} from "rxjs";

function reInitOnEvent<T = any> (
	event: EventEmitter<T>,
	fn: (t?: T) => void,
	defaultT?: T
): Subscription {
	fn(defaultT);
	return event.subscribe(fn);
}

export default reInitOnEvent;
export {reInitOnEvent};
