import {CommonModule} from "@angular/common";
import {NgModule} from '@angular/core';
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";

import {ModalAlertComponent} from './modal-alert/modal-alert.component';
import {ModalConfirmComponent} from "./modal-confirm/modal-confirm.component";
import {ModalDefaultParametersService} from "./modal-default-parameters.service";
import {ModalsService} from "./modals.service";
import {CloseReason, MODAL_DATA, ModalOptions, ModalParameters, ModalRunParameters} from "./types";

@NgModule({
	declarations: [
		ModalAlertComponent,
		ModalConfirmComponent
	],
	imports: [
		CommonModule,
		NgbModalModule
	],
	exports: [
		ModalAlertComponent,
		ModalConfirmComponent
	],
	providers: [ModalDefaultParametersService, ModalsService]
})
export class ModalsModule {
}

export {
	CloseReason,
	MODAL_DATA,
	ModalParameters,
	ModalRunParameters,
	ModalOptions,
	ModalsService,
	ModalDefaultParametersService
};
