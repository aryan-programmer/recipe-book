import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalAlertComponent} from "./modal-alert/modal-alert.component";
import {ModalConfirmComponent} from "./modal-confirm/modal-confirm.component";
import {ModalDefaultParametersService} from "./modal-default-parameters.service";
import {CloseReason, ModalOptions, ModalRunParameters} from "./types";

@Injectable()
export class ModalsService {
	constructor (
		private p: ModalDefaultParametersService,
		private dialog2: MatDialog
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
			let s = this.dialog2.open(ModalAlertComponent, {
				data: params,
				panelClass: params.modalContentClasses,
				disableClose: params.disableClose
			}).afterClosed().subscribe(value => {
				if (value === true) resolve(CloseReason.Ok);
				else resolve(CloseReason.Dismiss);
				s.unsubscribe();
			});
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
			let s = this.dialog2.open(ModalConfirmComponent, {
				data: params,
				panelClass: params.modalContentClasses,
				disableClose: params.disableClose
			}).afterClosed().subscribe(value => {
				if (value === true) resolve(CloseReason.Ok);
				else if (value === false) resolve(CloseReason.Cancel);
				else resolve(CloseReason.Dismiss);
				s.unsubscribe();
			});
		});
	}
}
