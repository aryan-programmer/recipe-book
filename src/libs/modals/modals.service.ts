import {Injectable, Injector} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalAlertComponent} from "./modal-alert/modal-alert.component";
import {ModalConfirmComponent} from "./modal-confirm/modal-confirm.component";
import {ModalDefaultParametersService} from "./modal-default-parameters.service";
import {ModalOptions, ModalRunParameters, CloseReason, MODAL_DATA} from "./types";

@Injectable()
export class ModalsService {
	constructor (
		private dialog: NgbModal,
		private p: ModalDefaultParametersService
	) {
	}

	alert (data: string, options?: ModalOptions): Promise<CloseReason> {
		let params: ModalRunParameters = {
			body: data,
			bodyAsRawHtml: false,
			...this.p.alertParams,
			...options,
		};
		return new Promise<CloseReason>(resolve => {
			this.dialog.open(ModalAlertComponent, {
				injector: Injector.create({providers: [{provide: MODAL_DATA, useValue: params}]}),
				backdrop: params.backdrop,
				fullscreen: params.fullscreen,
				keyboard: params.keyboard,
				scrollable: params.scrollable,
				size: params.size,
			}).result.then(resolve).catch(reason => {
				if (typeof reason == "number") resolve(reason);
				resolve(CloseReason.Dismiss);
			})
		});
	}

	confirm (data: string, options?: ModalOptions): Promise<CloseReason> {
		let params: ModalRunParameters = {
			body: data,
			bodyAsRawHtml: false,
			...this.p.confirmParams,
			...options,
		};
		return new Promise<CloseReason>(resolve => {
			this.dialog.open(ModalConfirmComponent, {
				injector: Injector.create({providers: [{provide: MODAL_DATA, useValue: params}]}),
				backdrop: params.backdrop,
				fullscreen: params.fullscreen,
				keyboard: params.keyboard,
				scrollable: params.scrollable,
				size: params.size,
			}).result.then(resolve).catch(reason => {
				if (typeof reason == "number") resolve(reason);
				resolve(CloseReason.Dismiss);
			})
		});
	}
}
