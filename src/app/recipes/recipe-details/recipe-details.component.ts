import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {RecipeService} from 'src/app/services/recipe.service';
import nn from 'src/libs/functions/nn';
import {HasSubscriptions} from 'src/libs/HasSubscriptions';
import {ShoppingListService} from '../../services/shopping-list.service';
import {Recipe} from '../../structs/recipe';

@Component({
	selector: 'app-recipe-details',
	templateUrl: './recipe-details.component.html',
	styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent extends HasSubscriptions {
	recipe?: Recipe;
	areIngredientsShown: boolean = false;
	buttonText: string = '⯈';
	recipeIndex = -1;

	constructor (
		private recipeService: RecipeService,
		public shoppingListService: ShoppingListService,
		private activatedRoute: ActivatedRoute,
	) {
		super();
		let b = new BehaviorSubject(0);
		b.unsubscribe();
		this.subscriptions = [
			activatedRoute.params.subscribe(params => {
				this.recipe = recipeService.recipes[this.recipeIndex = +params.idx];
			}),
			recipeService.recipesChange.subscribe((recipes: Recipe[]) => {
				this.recipe = recipes[this.recipeIndex];
			})
		];
	}

	toggleIngredients () {
		this.areIngredientsShown = !this.areIngredientsShown;
		this.buttonText = this.areIngredientsShown ? '⯆' : '⯈';
	}

	addIngredientsToShoppingList () {
		this.shoppingListService.ingredients.push(...nn(this.recipe).ingredients);
	}
}
