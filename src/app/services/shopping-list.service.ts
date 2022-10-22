import {Injectable, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {observeArrayChanges} from 'src/libs/functions/observeArrayChanges';
import {Ingredient} from '../structs/ingredient';
import {RecipeService} from './recipe.service';

@Injectable({
	providedIn: 'root'
})
export class ShoppingListService {
	@Output() readonly ingredientsChange = new Subject<Ingredient[]>();
	@Input() private readonly _ingredients: Ingredient[];

	constructor (private recipeService: RecipeService) {
		this._ingredients = [];
		this._ingredients = observeArrayChanges(
			this._ingredients,
			ingredient => this.ingredientsChange.next(ingredient)
		);
	}

	get ingredients (): Ingredient[] {
		return this._ingredients;
	}
}