import {createReducer, on} from "@ngrx/store";
import {Ingredient} from "../common/utils/types";
import {AddIngredient, AddIngredients, DeleteIngredient, UpdateIngredient} from "./shopping-list.actions";

export type ShoppingListState = { ingredients: Ingredient[] };

const initialState: ShoppingListState = {
	ingredients: [
		{
			name: "Ing",
			quantity: [123, "qqq"],
			cost: 123,
		},
		{
			name: "Ing2",
			quantity: [1, "Quan"],
			cost: 12,
		},
		{
			name: "Ingredient",
			quantity: [13, "grams"],
			cost: 10,
		}
	]
};

export const ShoppingList = "ShoppingList";

export const shoppingListReducer = createReducer(
	initialState,
	on(AddIngredient, (state, {ingredient}) => {
		return {
			...state,
			ingredients: [...state.ingredients, ingredient]
		};
	}),
	on(AddIngredients, (state, {ingredients}) => {
		return {
			...state,
			ingredients: [...state.ingredients, ...ingredients]
		};
	}),
	on(DeleteIngredient, (state, {index}) => {
		return {
			...state,
			ingredients: state.ingredients.filter((v, i) => i !== index)
		};
	}),
	on(UpdateIngredient, (state, {index, ingredient}) => {
		const ingredients  = state.ingredients.slice();
		ingredients[index] = {
			...state.ingredients[index],
			...ingredient
		};
		return {
			...state,
			ingredients
		};
	}),
);
