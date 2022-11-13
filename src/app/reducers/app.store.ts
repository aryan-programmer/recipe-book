import {ActionReducerMap} from "@ngrx/store";
import * as Auth from "../auth/reducer";
import "../auth/reducer/auth.reducers";
import * as ShoppingList from "./shopping-list";

export type AppState = {
	[ShoppingList.NAME]: ShoppingList.State,
	[Auth.NAME]: Auth.State
}

export const reducers: ActionReducerMap<AppState> = {
	[ShoppingList.NAME]: ShoppingList.reducer,
	[Auth.NAME]: Auth.reducer,
};
