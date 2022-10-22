import {Component} from '@angular/core';
import {ShoppingListService} from '../services/shopping-list.service';
import {Ingredient} from '../structs/ingredient';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
	ingredients: Ingredient[];

	constructor (public shoppingListService: ShoppingListService) {
		this.ingredients = shoppingListService.ingredients;
		shoppingListService.ingredientsChange.subscribe(
			(ingredients: Ingredient[]) => this.ingredients = ingredients);
	}
}
