import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from "@ngrx/store";
import {combineLatestWith, Observable} from "rxjs";
import nn from 'src/libs/functions/nn';
import {Unsubscriber} from 'src/libs/unsubscriber';
import {ModalsService} from "../../../libs/modals/modals.service";
import {Recipe} from '../../common/utils/types';
import * as Recipes from "../../recipes/reducers";
import {AppState} from "../../reducers/app.store";
import * as ShoppingList from "../../shopping-list/reducers";

@Component({
	selector: 'app-recipe-details',
	templateUrl: './recipe-details.component.html'
})
export class RecipeDetailsComponent extends Unsubscriber {
	recipe!: Recipe;
	areIngredientsShown: boolean = false;
	buttonText: string           = '⯈';
	recipeIndex                  = -1;
	recipesState$: Observable<Recipes.State>;

	constructor (
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private modals: ModalsService,
		private store: Store<AppState>,
	) {
		super();
		this.recipesState$ = this.store.select(Recipes.NAME);
		this.subscriptions = [
			activatedRoute.params.pipe(
				combineLatestWith(this.recipesState$))
				.subscribe(([params, state]) => {
					this.recipe = state.recipes[this.recipeIndex = +params["idx"]];
					if (this.recipe == null) {
						this.router.navigate(["../"], {relativeTo: this.activatedRoute});
					}
				}),
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
			this.store.dispatch(Recipes.DeleteRecipe({index: this.recipeIndex}));
			await this.router.navigate(["../"], {relativeTo: this.activatedRoute});
		}
	}
}
