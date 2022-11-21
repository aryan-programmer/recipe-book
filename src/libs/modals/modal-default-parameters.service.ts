import {Injectable} from '@angular/core';
import {ModalParameters} from "./types";

@Injectable()
export class ModalDefaultParametersService {
	alertParams: ModalParameters   = {
		title: "",
		okButtonText: "OK",
		cancelButtonText: "Cancel",
		okButtonClasses: ["bg-success", "mat-round-img-btn"],
		cancelButtonClasses: ["bg-warning", "mat-round-img-btn"],
		modalContentClasses: ["border-0"],
		disableClose: false,
	} as ModalParameters;
	confirmParams: ModalParameters = {
		title: "",
		okButtonText: "OK",
		cancelButtonText: "Cancel",
		okButtonClasses: ["bg-success", "mat-round-img-btn"],
		cancelButtonClasses: ["bg-warning", "mat-round-img-btn"],
		modalContentClasses: ["border-0"],
		disableClose: true,
	} as ModalParameters;

	constructor () {
	}
}
