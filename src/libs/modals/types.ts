export interface ModalParameters {
	title: string;
	okButtonText: string;
	cancelButtonText: string;
	okButtonClasses: string[];
	cancelButtonClasses: string[];
	modalContentClasses: string[];
	disableClose: boolean;
}

export interface ModalOptions extends Partial<ModalParameters> {
	bodyAsRawHtml?: boolean;
}

export interface ModalRunParameters extends Required<ModalOptions> {
	body: string;
}

export enum CloseReason {
	Dismiss = 0,
	Ok      = 1,
	Cancel  = 2
}

export const MODAL_DATA = "ModalsModule__DIALOG_DATA";
