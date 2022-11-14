import {createAction, props} from "@ngrx/store";
import {Recipe} from "../../common/utils/types";

export const NAME          = "RECIPES";
export const FETCH_RECIPES = NAME + "::FETCH_RECIPES";
export const SET_RECIPES   = NAME + "::SET_RECIPES";
export const STORE_RECIPES = NAME + "::STORE_RECIPES";
export const DELETE_RECIPE = NAME + "::DELETE_RECIPE";
export const UPDATE_RECIPE = NAME + "::UPDATE_RECIPE";
export const ADD_RECIPE    = NAME + "::ADD_RECIPE";

export const FetchRecipes = createAction(FETCH_RECIPES);
export const SetRecipes   = createAction(SET_RECIPES, props<{ recipes: Recipe[] }>());
export const StoreRecipes = createAction(STORE_RECIPES);
export const DeleteRecipe = createAction(DELETE_RECIPE, props<{ index: number }>());
export const UpdateRecipe = createAction(UPDATE_RECIPE, props<{ index: number, recipe: Recipe }>());
export const AddRecipe    = createAction(ADD_RECIPE, props<{ recipe: Recipe }>());

export type State = {
	recipes: Recipe[]
};
