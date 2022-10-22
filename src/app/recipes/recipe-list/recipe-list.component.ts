import {Component} from '@angular/core';
import {RecipeService} from '../../services/recipe.service';
import {Recipe} from '../../structs/recipe';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
	recipes: Recipe[];

	constructor (public recipeService: RecipeService) {
		this.recipes = recipeService.recipes;
		recipeService.recipesChange.subscribe(
			(recipes: Recipe[]) => this.recipes = recipes);
	}
}
