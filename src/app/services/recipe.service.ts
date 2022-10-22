import {Injectable, Input} from '@angular/core';
import {Subject} from 'rxjs';
import {observeArrayChanges} from 'src/libs/functions/observeArrayChanges';
import {Recipe} from '../structs/recipe';

@Injectable({
	providedIn: 'root'
})
export class RecipeService {
	public readonly recipesChange = new Subject<Recipe[]>();
	@Input() private readonly _recipes: Recipe[] = [
		{
			name: 'Test 1',
			description: 'Description 1',
			imageUrl: 'assets/recipe.jpg',
			ingredients: [{
				name: 'Null Ingredient 1',
				quantity: '0 voids',
				totalCostInUsd: 0,
			}],
		},
		{
			name: 'Test 2',
			description: 'Description 2',
			imageUrl: 'assets/recipe.jpg',
			ingredients: [{
				name: 'Null Ingredient 1',
				quantity: '0 voids',
				totalCostInUsd: 0.00,
			}],
		},
		{
			name: 'A highly extensive, long and useless title',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n',
			imageUrl: 'assets/recipe.jpg',
			ingredients: [
				{
					name: 'Cheddar cheese',
					quantity: '10 slices',
					totalCostInUsd: 1.21,
				},
				{
					name: 'Tomato sauce',
					quantity: '10 ml pouch',
					totalCostInUsd: 10,
				},
				{
					name: 'Rice',
					quantity: '100 mg',
					totalCostInUsd: 12.11,
				},
				{
					name: 'Oil',
					quantity: '1 ml',
					totalCostInUsd: 19.10,
				},
				{
					name: 'Long and completely unrelated but very expensive ingredient',
					quantity: '10 seconds',
					totalCostInUsd: 10000,
				},
			],
		}
	];

	constructor () {
		this._recipes = observeArrayChanges(
			this._recipes,
			recipes => this.recipesChange.next(recipes)
		);
	}

	get recipes (): Recipe[] {
		return this._recipes;
	}
}
