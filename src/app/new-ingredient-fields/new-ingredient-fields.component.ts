import {Component, ElementRef, ViewChild} from '@angular/core';
import {Ingredient} from 'src/app/structs/ingredient';
import modals from 'src/libs/modals';

@Component({
	selector: 'app-new-ingredient-fields',
	templateUrl: './new-ingredient-fields.component.html',
	styleUrls: ['./new-ingredient-fields.component.css']
})
export class NewIngredientFieldsComponent {
	@ViewChild('name', {static: true}) name: ElementRef;
	@ViewChild('quantityValue', {static: true}) quantityValue: ElementRef;
	@ViewChild('quantityUnit', {static: true}) quantityUnit: ElementRef;
	@ViewChild('amount', {static: true}) amount: ElementRef;

	constructor () {
	}

	async verifyAndGetIngredient (waitForErrorModalToClose: boolean = false): Promise<Ingredient | undefined> {
		const errors: string[] = [];
		if (this.name.nativeElement.value === '') {
			errors.push('&nbsp;&nbsp;Please enter a name for the ingredient');
		}
		if (this.quantityValue.nativeElement.value === '') {
			errors.push('&nbsp;&nbsp;Please enter a value for the quantity of the ingredient');
		}
		if (this.quantityUnit.nativeElement.value === '') {
			errors.push('&nbsp;&nbsp;Please enter a value for the unit of the quantity of the ingredient');
		}
		if (this.amount.nativeElement.value === '') {
			errors.push('&nbsp;&nbsp;Please enter an amount, in USD, for the ingredient');
		}
		if (errors.length !== 0) {
			const errorsModalText = errors.join('.<br>');
			const errModal = modals.alert(`<h4>Invalid form data:</h4>
${errorsModalText}.`, {
				bodyAsRawHtml: true,
				size: 'lg'
			});
			if (waitForErrorModalToClose) {
				await errModal;
			}
			return;
		}
		const val: Ingredient = {
			name: this.name.nativeElement.value,
			quantity: `${this.quantityValue.nativeElement.value} ${this.quantityUnit.nativeElement.value}`,
			totalCostInUsd: +this.amount.nativeElement.value,
		};
		this.clearFormFieldValues();
		return val;
	}

	clearFormFieldValues () {
		this.name.nativeElement.value = '';
		this.quantityValue.nativeElement.value = '1';
		this.quantityUnit.nativeElement.value = '';
		this.amount.nativeElement.value = '';
	}
}
