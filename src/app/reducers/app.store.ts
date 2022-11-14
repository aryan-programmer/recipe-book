import {ActionReducerMap} from "@ngrx/store";
import * as Auth from "../auth/reducer";
import * as Recipes from "../recipes/reducers";
import * as ShoppingList from "../shopping-list/reducers";

export type AppState = {
	[ShoppingList.NAME]: ShoppingList.State,
	[Auth.NAME]: Auth.State,
	[Recipes.NAME]: Recipes.State
}

export const reducers: ActionReducerMap<AppState> = {
	[ShoppingList.NAME]: ShoppingList.reducer,
	[Auth.NAME]: Auth.reducer,
	[Recipes.NAME]: Recipes.reducer
};
