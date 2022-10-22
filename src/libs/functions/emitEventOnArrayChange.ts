import {EventEmitter} from "@angular/core";
import observeArrayChanges from "./observeArrayChanges";

function emitEventOnArrayChange<
	TPropArray_Elem,
	TPropArray extends Array<TPropArray_Elem>,
	TPropEvent extends EventEmitter<TPropArray_Elem[]>> (
	array: TPropArray,
	event: TPropEvent
): TPropArray_Elem[] {
	return observeArrayChanges(array as TPropArray,
		(ts: TPropArray) => {
			event.emit(ts);
		}
	);
}

export default emitEventOnArrayChange;
export {emitEventOnArrayChange};
