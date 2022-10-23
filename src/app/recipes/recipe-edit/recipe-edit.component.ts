import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {Unsubscriber} from 'src/libs/unsubscriber';
import nn from "../../../libs/functions/nn";
import roundToTwo from "../../../libs/functions/roundToTwo";
import {Object} from "../../../libs/types";
import {RecipeService} from "../../services/recipe.service";
import {Ingredient} from "../../structs/ingredient";
import {Recipe} from "../../structs/recipe";

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent extends Unsubscriber {
	id?: number;
	editMode = false;
	recipeForm!: FormGroup;

	constructor (
		private activatedRoute: ActivatedRoute,
		private recipeService: RecipeService,
		private router: Router) {
		super();
		this.subscriptions = [
			activatedRoute.params.subscribe(params => {
				this.id       = +params['idx'];
				this.editMode = params['idx'] != null;
				this.initForm();
			})
		];
	}

	private initForm () {
		let name                     = "";
		let description              = "";
		let imageUrl                 = "";
		let ingredients: FormGroup[] = [];
		if (this.editMode) {
			const recipe = this.recipeService.recipes[nn(this.id)];
			name         = recipe.name;
			description  = recipe.description;
			imageUrl     = recipe.imageUrl;
			ingredients  = recipe.ingredients.map(RecipeEditComponent.formGroupFromIngredient);
		}
		this.recipeForm = new FormGroup({
			"name": new FormControl(name, Validators.required),
			"description": new FormControl(description, Validators.required),
			"imageUrl": new FormControl(imageUrl, Validators.required),
			"ingredients": new FormArray(ingredients),
		});
	}

	private static formGroupFromIngredient (ing: Ingredient | undefined = undefined) {
		return new FormGroup({
			"name": new FormControl(ing?.name, Validators.required),
			"quantity": new FormControl(ing?.quantity?.[0], [Validators.required, Validators.min(0)]),
			"quantityUnit": new FormControl(ing?.quantity?.[1], Validators.required),
			"cost": new FormControl(ing?.cost, [Validators.required, Validators.min(0.01)])
		});
	}

	get ingredientControls () {
		return (this.recipeForm.get("ingredients") as FormArray).controls as FormGroup[]
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
			this.recipeService.recipes[nn(this.id)] = recipe
		} else {
			this.recipeService.recipes.push(recipe)
		}
		this.onCancel();
	}

	onAddIngredient () {
		(this.recipeForm.get("ingredients") as FormArray).push(RecipeEditComponent.formGroupFromIngredient());
	}

	onCancel () {
		this.router.navigate(["../"], {relativeTo: this.activatedRoute});
	}

	deleteIngredient (i: number) {
		(this.recipeForm.get("ingredients") as FormArray).removeAt(i);
	}
}
