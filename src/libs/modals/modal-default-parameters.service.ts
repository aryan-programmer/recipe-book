import {Injectable} from '@angular/core';
import {ModalParameters} from "./types";

@Injectable()
export class ModalDefaultParametersService {
	alertParams: ModalParameters   = {
		title: "",
		okButtonText: "OK",
		cancelButtonText: "Cancel",
		okButtonClasses: ["btn", "btn-success"],
		cancelButtonClasses: ["btn", "btn-warning"],
		modalContentClasses: ["border-0"],
		showClose: true,
		backdrop: true,
		fullscreen: false,
		keyboard: true,
		scrollable: true,
		size: "md",
	} as ModalParameters;
	confirmParams: ModalParameters = {
		title: "",
		okButtonText: "OK",
		cancelButtonText: "Cancel",
		okButtonClasses: ["btn", "btn-success"],
		cancelButtonClasses: ["btn", "btn-warning"],
		modalContentClasses: ["border-0"],
		showClose: false,
		backdrop: "static",
		fullscreen: false,
		keyboard: false,
		scrollable: true,
		size: "md",
	} as ModalParameters;

	constructor () {
	}
}
