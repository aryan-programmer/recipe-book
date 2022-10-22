import {Component, ViewChild} from '@angular/core';
import {NewIngredientFieldsComponent} from 'src/app/new-ingredient-fields/new-ingredient-fields.component';
import modals from 'src/libs/modals';
import {ShoppingListService} from '../../services/shopping-list.service';

@Component({
	selector: 'app-shopping-list-edit',
	templateUrl: './shopping-list-edit.component.html',
	styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
	@ViewChild(NewIngredientFieldsComponent, {static: true}) newIngredientFieldsComponent: NewIngredientFieldsComponent;

	constructor (public shoppingListService: ShoppingListService) {
	}

	async onAdd () {
		const val = await this.newIngredientFieldsComponent.verifyAndGetIngredient(true);
		if (val == null) {
			return;
		}
		this.shoppingListService.ingredients.push(val);
	}

	async showDeleteConfirmationMessage () {
		await modals.confirm(`Are you sure that you want to delete this element?
Once you do this, it can not be recovered directly.`, {
			okButtonText: 'Yes, I want to delete it.',
			cancelButtonText: 'No, I do NOT want to delete it.',
			size: 'xl'
		});
	}
}
