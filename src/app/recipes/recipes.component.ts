import {Component} from '@angular/core';
import {RecipeService} from '../services/recipe.service';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
	constructor (public recipeService: RecipeService) {
	}
}
