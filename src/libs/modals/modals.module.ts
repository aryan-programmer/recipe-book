import {CommonModule} from "@angular/common";
import {NgModule} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {CdkMenuModule} from "@angular/cdk/menu";
import {OverlayModule} from "@angular/cdk/overlay";
import {PortalModule} from "@angular/cdk/portal";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {CdkStepperModule} from "@angular/cdk/stepper";
import {CdkTableModule} from "@angular/cdk/table";
import {CdkTreeModule} from "@angular/cdk/tree";
import {DialogModule} from "@angular/cdk/dialog";


import {ModalAlertComponent} from './modal-alert/modal-alert.component';
import {ModalConfirmComponent} from "./modal-confirm/modal-confirm.component";
import {ModalDefaultParametersService} from "./modal-default-parameters.service";
import {ModalsService} from "./modals.service";
import {CloseReason, MODAL_DATA, ModalOptions, ModalParameters, ModalRunParameters} from "./types";

@NgModule({
	declarations: [
		ModalAlertComponent,
		ModalConfirmComponent,
	],
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
		CdkMenuModule,
		CdkStepperModule,
		CdkTableModule,
		CdkTreeModule,
		DragDropModule,
		OverlayModule,
		PortalModule,
		ScrollingModule,
		DialogModule,
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
