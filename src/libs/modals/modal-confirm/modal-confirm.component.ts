import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ModalRunParameters} from "../types";

@Component({
	selector: 'modal-alert',
	templateUrl: './modal-confirm.component.html',
})
export class ModalConfirmComponent {
	constructor (@Inject(MAT_DIALOG_DATA) public params: ModalRunParameters) {
	}
}
