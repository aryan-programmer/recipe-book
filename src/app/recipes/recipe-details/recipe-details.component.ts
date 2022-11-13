import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from "@ngrx/store";
import {BehaviorSubject} from 'rxjs';
import {RecipeService} from 'src/app/services/recipe.service';
import nn from 'src/libs/functions/nn';
import {Unsubscriber} from 'src/libs/unsubscriber';
import {ModalsService} from "../../../libs/modals/modals.service";
import {Recipe} from '../../common/utils/types';
import {AppState} from "../../reducers/app.store";
import * as ShoppingList from "../../reducers/shopping-list";

@Component({
	selector: 'app-recipe-details',
	templateUrl: './recipe-details.component.html'
})
export class RecipeDetailsComponent extends Unsubscriber {
	recipe!: Recipe;
	areIngredientsShown: boolean = false;
	buttonText: string           = '⯈';
	recipeIndex                  = -1;

	constructor (
		private recipeService: RecipeService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private modals: ModalsService,
		private store: Store<AppState>,
	) {
		super();
		let b = new BehaviorSubject(0);
		b.unsubscribe();
		this.subscriptions = [
			activatedRoute.params.subscribe(params => {
				this.recipe = recipeService.recipes[this.recipeIndex = +params['idx']];
			}),
			recipeService.recipesChange.subscribe((recipes: Recipe[]) => {
				this.recipe = recipes[this.recipeIndex];
			})
		];
	}

	toggleIngredients () {
		this.areIngredientsShown = !this.areIngredientsShown;
		this.buttonText          = this.areIngredientsShown ? '⯆' : '⯈';
	}

	addIngredientsToShoppingList () {
		this.store.dispatch(ShoppingList.AddIngredients({ingredients: nn(this.recipe).ingredients}))
	}

	async deleteRecipe () {
		if (await this.modals.confirm(`Are you sure that you want to delete this recipe?
Once you do this, it can not be recovered directly.`, {
			title: "Delete recipe?",
			okButtonText: 'Delete it.',
			cancelButtonText: 'Do NOT delete it.',
			size: 'lg',
		})) {
			this.recipeService.recipes.splice(this.recipeIndex, 1);
			await this.router.navigate(["../"], {relativeTo: this.activatedRoute});
		}
	}
}
