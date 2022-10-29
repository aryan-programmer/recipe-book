import {Component} from '@angular/core';
import {Unsubscriber} from "../../../libs/unsubscriber";
import {RecipeService} from '../../services/recipe.service';
import {Recipe} from '../../utils/types';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent extends Unsubscriber {
	recipes: Recipe[];

	constructor (public recipeService: RecipeService) {
		super();
		this.recipes       = recipeService.recipes;
		this.subscriptions = [
			recipeService.recipesChange.subscribe(
				(recipes: Recipe[]) => this.recipes = recipes)
		];
	}
}
