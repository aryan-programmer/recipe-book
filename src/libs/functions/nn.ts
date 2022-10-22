import {Optional} from "../types";

class NullOrUndefinedValueException extends Error {
	public readonly nullOrUndefined: null | undefined;

	constructor (error: string, nullOrUndefined: null | undefined) {
		super(error);
		this.nullOrUndefined = nullOrUndefined;
	}
}

function nn<T> (
	val: Optional<T>,
	message: string = "The value was expected to be not null or undefined but it was."
): T {
	if (val === null) {
		throw new NullOrUndefinedValueException(message, null);
	}
	if (val === undefined) {
		throw new NullOrUndefinedValueException(message, undefined);
	}
	return val;
}

export default nn;
export {nn, NullOrUndefinedValueException};
