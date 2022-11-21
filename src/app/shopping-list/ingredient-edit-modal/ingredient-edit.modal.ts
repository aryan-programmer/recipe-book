import {Component, Inject, Injector, OnInit, Optional, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {firstValueFrom} from "rxjs";
import nn from "../../../libs/functions/nn";
import roundToTwo from "../../../libs/functions/roundToTwo";
import {ModalsService} from "../../../libs/modals/modals.service";
import {CloseReason, MODAL_DATA} from "../../../libs/modals/types";
import {Ingredient} from "../../common/utils/types";
import {AppState} from "../../reducers/app.store";
import * as ShoppingList from "../reducers";

@Component({
	selector: 'app-ingredient-edit-modal',
	templateUrl: './ingredient-edit.modal.html'
})
export class IngredientEditModal implements OnInit {
	@ViewChild("form", {static: true}) form!: NgForm;
	editMode = false;

	constructor (
		private modal: MatDialogRef<IngredientEditModal>,
		private modals: ModalsService,
		private store: Store<AppState>,
		@Inject(MAT_DIALOG_DATA) @Optional() private idx?: number,
	) {
		this.editMode = idx != null;
	}

	ngOnInit () {
		if (this.idx == null) return;
		else {
			setTimeout(async () => {
				if (this.idx == null) return;
				let ing = (await firstValueFrom(this.store))[ShoppingList.NAME].ingredients[this.idx];
				this.form.form.setValue({
					name: ing.name,
					quantity: ing.quantity[0],
					quantityUnit: ing.quantity[1],
					cost: ing.cost,
				});
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
		if (this.editMode) {
			this.store.dispatch(ShoppingList.UpdateIngredient({index: nn(this.idx), ingredient: val}));
		} else {
			this.store.dispatch(ShoppingList.AddIngredient({ingredient: val}));
		}
		this.modal.close();
	}

	async showDeleteConfirmationMessage () {
		if (await this.modals.confirm(`Are you sure that you want to delete this ingredient?
Once you do this, it can not be recovered directly.`, {
			title: "Delete ingredient?",
			okButtonText: 'Delete it.',
			cancelButtonText: 'Do NOT delete it.',
		}) === CloseReason.Ok) {
			this.store.dispatch(ShoppingList.DeleteIngredient({index: nn(this.idx)}));
			this.modal.close();
		}
	}

	onClear () {
		this.form.resetForm();
	}

	close () {
		this.modal.close();
	}

	static open (modalService: MatDialog, index?: number) {
		modalService.open(IngredientEditModal, {
			data: index,
			// disableClose: true,
			panelClass: ["mat-dialog-panel-applies--bg-gradient--perfect-white"]
		});
	}
}
