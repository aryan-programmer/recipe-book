import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import * as bs from 'bootstrap';
import modals from 'src/libs/modals';
import nn from "../../../libs/functions/nn";
import roundToTwo from "../../../libs/functions/roundToTwo";
import {Unsubscriber} from "../../../libs/unsubscriber";
import {Ingredient} from "../../utils/types";

@Component({
	selector: 'app-ingredient-list-edit',
	templateUrl: './ingredient-list-edit.component.html'
})
export class IngredientListEditComponent extends Unsubscriber implements OnInit {
	@ViewChild("form", {static: false}) form!: NgForm;
	@ViewChild("modalForm", {static: true}) modalForm!: ElementRef<HTMLDivElement>;
	@Input() ingredients!: Ingredient[];
	modal!: bs.Modal;
	editingIdx?: number = undefined;
	editMode            = false;

	constructor () {
		super();
	}

	ngOnInit () {
		this.modal = new bs.Modal(this.modalForm.nativeElement);
	}

	onAdd () {
		this.form.resetForm();
		this.editMode   = false;
		this.editingIdx = undefined;
		this.modal.show();
	}

	onEditItem (i: number) {
		this.editMode   = true;
		this.editingIdx = i;
		let ing         = this.ingredients[i];
		this.form.setValue({
			name: ing.name,
			quantity: ing.quantity[0],
			quantityUnit: ing.quantity[1],
			cost: ing.cost,
		});
		this.modal.show();
	}

	async onSubmit (form: NgForm) {
		console.log(form);
		const errors: string[] = [];
		const fVal             = form.value;
		if (fVal.name === '') {
			errors.push('&nbsp;&nbsp;Please enter a name for the ingredient');
		}
		if (fVal.quantity === '') {
			errors.push('&nbsp;&nbsp;Please enter a value for the quantity of the ingredient');
		}
		if (fVal.quantityUnit === '') {
			errors.push('&nbsp;&nbsp;Please enter a value for the unit of the quantity of the ingredient');
		}
		if (fVal.cost === '') {
			errors.push('&nbsp;&nbsp;Please enter an amount, in USD, for the ingredient');
		}
		if (errors.length !== 0) {
			const errorsModalText = errors.join('.<br>');
			await modals.alert(`<h4>Invalid form data:</h4>
${errorsModalText}.`, {
				bodyAsRawHtml: true,
				size: 'lg'
			});
			return;
		}
		const val: Ingredient = {
			name: fVal.name,
			quantity: [fVal.quantity, fVal.quantityUnit],
			cost: roundToTwo(+fVal.cost)
		};
		if (this.editMode) {
			this.ingredients[nn(this.editingIdx)] = val;
		} else {
			this.ingredients.push(val);
		}
		this.modal.hide();
	}

	async showDeleteConfirmationMessage () {
		if (await modals.confirm(`Are you sure that you want to delete this ingredient?
Once you do this, it can not be recovered directly.`, {
			title: "Delete ingredient?",
			okButtonText: 'Delete it.',
			cancelButtonText: 'Do NOT delete it.',
			size: 'lg',
		})) {
			this.ingredients.splice(nn(this.editingIdx), 1);
		}
		this.modal.hide();
	}

	onClear () {
		this.form.resetForm();
	}
}
