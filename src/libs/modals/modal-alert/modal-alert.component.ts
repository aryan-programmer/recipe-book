import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ModalRunParameters} from "../types";

@Component({
	selector: 'modal-alert',
	templateUrl: './modal-alert.component.html',
})
export class ModalAlertComponent {
	constructor (@Inject(MAT_DIALOG_DATA) public params: ModalRunParameters) {
	}
}
