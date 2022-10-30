import {Component, Inject} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CloseReason, MODAL_DATA,ModalRunParameters} from "../types";

@Component({
	selector: 'modal-alert',
	templateUrl: './modal-alert.component.html',
})
export class ModalAlertComponent {

	constructor (
		@Inject(MODAL_DATA) public params: ModalRunParameters,
		public modal: NgbActiveModal) {

	}

	closeClick () {
		this.modal.close(CloseReason.CloseButton);
	}

	okClick () {
		this.modal.close(CloseReason.Ok);
	}
}
