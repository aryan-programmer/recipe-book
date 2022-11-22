import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from "@ngrx/store";
import {combineLatestWith, Observable} from "rxjs";
import {Unsubscriber} from 'src/libs/unsubscriber';
import nn from "../../../libs/functions/nn";
import roundToTwo from "../../../libs/functions/roundToTwo";
import {Object, Optional} from "../../../libs/types";
import {Ingredient, Recipe} from "../../common/utils/types";
import {AppState} from "../../reducers/app.store";
import * as Recipes from "../reducers";

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent extends Unsubscriber {
	id?: number;
	editMode = false;
	recipeForm!: FormGroup;
	recipesState$: Observable<Recipes.State>;

	constructor (
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private store: Store<AppState>,
	) {
		super();
		this.recipesState$ = this.store.select(Recipes.NAME);
		this.subscriptions = [
			activatedRoute.params.pipe(
				combineLatestWith(this.recipesState$))
				.subscribe(([params, state]) => {
					this.id       = +params['idx'];
					this.editMode = params['idx'] != null;
					this.initForm(this.editMode ? state.recipes[this.id] : null);
				})
		];
	}

	get ingredientControls () {
		return (this.recipeForm.get("ingredients") as FormArray).controls as FormGroup[]
	}

	private static formGroupFromIngredient (ing: Ingredient | undefined = undefined) {
		return new FormGroup({
			"name": new FormControl(ing?.name, Validators.required),
			"quantity": new FormControl(ing?.quantity?.[0], [Validators.required, Validators.min(0)]),
			"quantityUnit": new FormControl(ing?.quantity?.[1], Validators.required),
			"cost": new FormControl(ing?.cost, [Validators.required, Validators.min(0.01)])
		});
	}

	onSubmit () {
		const recipe: Recipe = {
			name: this.recipeForm.value.name,
			description: this.recipeForm.value.description,
			imageUrl: this.recipeForm.value.imageUrl,
			ingredients: (this.recipeForm.value.ingredients as Object[]).map(value => ({
				name: value.name,
				quantity: [value.quantity, value.quantityUnit],
				cost: roundToTwo(+value.cost)
			}))
		};
		if (this.editMode) {
			this.store.dispatch(Recipes.UpdateRecipe({index: nn(this.id), recipe}));
		} else {
			this.store.dispatch(Recipes.AddRecipe({recipe}));
		}
		this.onCancel();
	}

	onAddIngredient () {
		console.log("Here");
		(this.recipeForm.get("ingredients") as FormArray).push(RecipeEditComponent.formGroupFromIngredient());
	}

	onCancel () {
		console.log("Cancel");
		this.router.navigate(["../"], {relativeTo: this.activatedRoute});
	}

	deleteIngredient (i: number) {
		(this.recipeForm.get("ingredients") as FormArray).removeAt(i);
	}

	private initForm (recipe: Optional<Recipe>) {
		let name                     = "";
		let description              = "";
		let imageUrl                 = "";
		let ingredients: FormGroup[] = [];
		if (this.editMode && recipe != null) {
			name        = recipe.name;
			description = recipe.description;
			imageUrl    = recipe.imageUrl;
			ingredients = recipe.ingredients.map(RecipeEditComponent.formGroupFromIngredient);
		}
		this.recipeForm = new FormGroup({
			"name": new FormControl(name, Validators.required),
			"description": new FormControl(description, Validators.required),
			"imageUrl": new FormControl(imageUrl, Validators.required),
			"ingredients": new FormArray(ingredients),
		});
	}
}
