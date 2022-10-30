import {Component, Inject, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CloseReason, MODAL_DATA,ModalRunParameters} from "../types";

@Component({
	selector: 'modal-alert',
	templateUrl: './modal-confirm.component.html',
})
export class ModalConfirmComponent implements OnInit {
	constructor (
		@Inject(MODAL_DATA) public params: ModalRunParameters,
		public modal: NgbActiveModal) {
	}

	ngOnInit (): void {
	}

	closeClick () {
		this.modal.close(CloseReason.CloseButton);
	}

	cancelClick () {
		this.modal.close(CloseReason.Cancel);
	}

	okClick () {
		this.modal.close(CloseReason.Ok);
	}
}
