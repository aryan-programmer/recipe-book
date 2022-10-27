import {Component, OnInit, ViewChild} from '@angular/core';
import {Unsubscriber} from "../../libs/unsubscriber";
import {IngredientListEditComponent} from "../ingredient-list/ingredient-list-edit/ingredient-list-edit.component";
import {ShoppingListService} from '../services/shopping-list.service';
import {Ingredient} from '../structs/ingredient';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent extends Unsubscriber implements OnInit {
	@ViewChild(IngredientListEditComponent) ingredientListEdit!: IngredientListEditComponent;
	ingredients!: Ingredient[];

	constructor (public shoppingListService: ShoppingListService) {
		super();
	}

	ngOnInit () {
		this.ingredients   = this.shoppingListService.ingredients;
		this.subscriptions = [this.shoppingListService.ingredientsChange.subscribe(
			(ingredients: Ingredient[]) => this.ingredients = ingredients)];
		console.log(this.ingredients);
	}

	onEditItem (i: number) {
		//this.shoppingListService.startedEditing.next(i);
		this.ingredientListEdit.onEditItem(i);
	}
}
