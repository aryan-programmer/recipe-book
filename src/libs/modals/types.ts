export interface ModalParameters {
	title: string;
	okButtonText: string;
	cancelButtonText: string;
	okButtonClasses: string[];
	cancelButtonClasses: string[];
	modalContentClasses: string[];
	showClose: boolean;
	/**
	 * If `true`, the backdrop element will be created for a given modal.
	 *
	 * Alternatively, specify `'static'` for a backdrop which doesn't close the modal on click.
	 *
	 * Default value is `true`.
	 */
	backdrop: boolean | 'static';
	/**
	 * If `true` modal will always be displayed in fullscreen mode.
	 *
	 * For values like `'md'` it means that modal will be displayed in fullscreen mode
	 * only if the viewport width is below `'md'`. For custom strings (ex. when passing `'mysize'`)
	 * it will add a `'modal-fullscreen-mysize-down'` class.
	 *
	 * If not specified will be `false`.
	 *
	 * @since 12.1.0
	 */
	fullscreen: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | boolean | string;
	/**
	 * If `true`, the modal will be closed when `Escape` key is pressed
	 *
	 * Default value is `true`.
	 */
	keyboard: boolean;
	/**
	 * Scrollable modal content (false by default).
	 *
	 * @since 5.0.0
	 */
	scrollable: boolean;
	/**
	 * Size of a new modal window.
	 */
	size: 'sm' | 'lg' | 'xl' | string;
}

export interface ModalOptions extends Partial<ModalParameters> {
	bodyAsRawHtml?: boolean;
}

export interface ModalRunParameters extends Required<ModalOptions> {
	body: string;
}

export enum CloseReason {
	Dismiss,
	Ok,
	CloseButton,
	Cancel
}

export const MODAL_DATA = "ModalsModule__DIALOG_DATA";
