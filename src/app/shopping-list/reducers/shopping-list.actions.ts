import {createAction, props} from "@ngrx/store";
import {Ingredient} from "../../common/utils/types";

export const NAME              = "SHOPPING_LIST";
export const ADD_INGREDIENT    = NAME + "::ADD_INGREDIENT";
export const ADD_INGREDIENTS   = NAME + "::ADD_INGREDIENTS";
export const DELETE_INGREDIENT = NAME + "::DELETE_INGREDIENT";
export const UPDATE_INGREDIENT = NAME + "::UPDATE_INGREDIENT";

export const AddIngredient    = createAction(ADD_INGREDIENT, props<{ ingredient: Ingredient }>());
export const AddIngredients   = createAction(ADD_INGREDIENTS, props<{ ingredients: Ingredient[] }>());
export const DeleteIngredient = createAction(DELETE_INGREDIENT, props<{ index: number }>());
export const UpdateIngredient = createAction(UPDATE_INGREDIENT, props<{ index: number, ingredient: Ingredient }>());

export type State = { ingredients: Ingredient[] };
