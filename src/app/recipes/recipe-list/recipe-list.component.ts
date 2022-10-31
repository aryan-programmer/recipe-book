import {Component} from '@angular/core';
import {Unsubscriber} from "../../../libs/unsubscriber";
import {Recipe} from '../../common/utils/types';
import {RecipeService} from '../../services/recipe.service';

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
