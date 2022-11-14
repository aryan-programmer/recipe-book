import {createReducer, on} from "@ngrx/store";
import {AddRecipe, DeleteRecipe, SetRecipes, State, UpdateRecipe} from "./recipes.actions";

const initialState: State = {
	recipes: //*
		[],

	/*/
		[
			{
				name: 'Test 1',
				description: 'Description 1',
				imageUrl: 'assets/recipe.jpg',
				ingredients: [{
					name: 'Null Ingredient 1',
					quantity: [1, "voids"],
					cost: 1,
				}],
			},
			{
				name: 'Test 2',
				description: 'Description 2',
				imageUrl: 'assets/recipe.jpg',
				ingredients: [{
					name: 'Null Ingredient 1',
					quantity: [1, "voids"],
					cost: 1.01,
				}],
			},
			{
				name: 'A highly extensive, long and useless title',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n',
				imageUrl: 'assets/recipe.jpg',
				ingredients: [
					{
						name: 'Cheddar cheese',
						quantity: [1, "slices"],
						cost: 1.21,
					},
					{
						name: 'Tomato sauce',
						quantity: [1, "ml pouch"],
						cost: 10,
					},
					{
						name: 'Rice',
						quantity: [1, "mg"],
						cost: 12.11,
					},
					{
						name: 'Oil',
						quantity: [1, "ml"],
						cost: 19.10,
					},
					{
						name: 'Long and completely unrelated but very expensive ingredient',
						quantity: [1, "seconds"],
						cost: 10000,
					},
				],
			}
		],//*/
};

export const reducer = createReducer(
	initialState,
	on(SetRecipes, (state, {recipes}) => {
		return {
			...state,
			recipes
		};
	}),
	on(DeleteRecipe, (state, {index}) => {
		return {
			...state,
			recipes: state.recipes.filter((v, i) => i !== index)
		};
	}),
	on(UpdateRecipe, (state, {recipe, index}) => {
		const recipes  = state.recipes.slice();
		recipes[index] = {
			...state.recipes[index],
			...recipe
		};
		return {
			...state,
			recipes
		};
	}),
	on(AddRecipe, (state, {recipe}) => {
		return {
			...state,
			recipes: [...state.recipes, recipe]
		};
	}),
);
