import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {RecipeService} from '../services/recipe.service';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
	value: any;

	constructor (public recipeService: RecipeService) {
	}

	formSubmit (f: NgForm) {
		console.log(f.form, this.value);
	}
}
