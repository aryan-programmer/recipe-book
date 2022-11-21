import {Injectable} from '@angular/core';
import {ModalDefaultParametersService} from "../../libs/modals/modal-default-parameters.service";

@Injectable()
export class ModalCustomParametersService extends ModalDefaultParametersService {
	constructor () {
		super();
		this.alertParams.title               = this.confirmParams.title = "Recipe book";
		this.alertParams.modalContentClasses = this.confirmParams.modalContentClasses = ["border-0", "mat-dialog-panel-applies--bg-gradient--kind-steel"];
		this.confirmParams.okButtonText      = "Confirm";
		this.alertParams.okButtonClasses     = ["bg-tertiary", "mat-round-img-btn"];
	}
}
