class ModalAlreadyShownError extends Error {
	constructor (message: string) {
		super(message);
	}
}

export default ModalAlreadyShownError;
export {ModalAlreadyShownError};
