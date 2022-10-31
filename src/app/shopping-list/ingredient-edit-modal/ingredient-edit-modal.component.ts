import {Component, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import roundToTwo from "../../../libs/functions/roundToTwo";
import {ModalsService} from "../../../libs/modals/modals.service";
import {CloseReason, MODAL_DATA} from "../../../libs/modals/types";
import {Ingredient} from "../../common/utils/types";

export const DELETE_INGREDIENT = Symbol("DELETE_INGREDIENT");

@Component({
	selector: 'app-ingredient-edit-modal',
	templateUrl: './ingredient-edit-modal.component.html'
})
export class IngredientEditModalComponent implements OnInit {
	@ViewChild("form", {static: true}) form!: NgForm;
	editMode = false;

	constructor (
		private modal: NgbActiveModal,
		private modals: ModalsService,
		@Inject(MODAL_DATA) @Optional() private ing?: Ingredient,
	) {
		console.log(ing);
		this.editMode = ing != null;
	}

	ngOnInit () {
		if (this.ing == null) return;
		else {
			setTimeout(args => {
				if (this.ing == null) return;
				this.form.form.setValue({
					name: this.ing.name,
					quantity: this.ing.quantity[0],
					quantityUnit: this.ing.quantity[1],
					cost: this.ing.cost,
				});
				console.log(this.form);
			});
		}
	}

	async onSubmit (form: NgForm) {
		const fVal            = form.value;
		const val: Ingredient = {
			name: fVal.name,
			quantity: [fVal.quantity, fVal.quantityUnit],
			cost: roundToTwo(+fVal.cost)
		};
		this.modal.close(val);
	}

	async showDeleteConfirmationMessage () {
		if (await this.modals.confirm(`Are you sure that you want to delete this ingredient?
Once you do this, it can not be recovered directly.`, {
			title: "Delete ingredient?",
			okButtonText: 'Delete it.',
			cancelButtonText: 'Do NOT delete it.',
			size: 'lg',
		}) === CloseReason.Ok) {
			this.modal.close(DELETE_INGREDIENT);
		}
	}

	onClear () {
		this.form.resetForm();
	}

	close () {
		this.modal.dismiss();
	}
}
