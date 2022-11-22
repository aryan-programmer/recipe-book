import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {map, switchMap, withLatestFrom} from "rxjs";
import {RECIPES_URL} from "../../common/utils/consts";
import {Recipe} from "../../common/utils/types";
import {AppState} from "../../reducers/app.store";
import * as Recipes from "./recipes.actions";

@Injectable()
export class RecipesEffects {
	fetchRecipes$ = createEffect(() => this.actions$.pipe(
		ofType(Recipes.FetchRecipes),
		switchMap(() => this.http.get<Recipe[]>(RECIPES_URL)),
		map(value => {
			value = value?.map(r => {
				return {
					name: r.name ?? "",
					description: r.description ?? "",
					imageUrl: r.imageUrl ?? "",
					ingredients: r.ingredients ?? [],
				} as Recipe;
			}) ?? [];
			return Recipes.SetRecipes({recipes: value});
		}),
	));

	storeRecipes$ = createEffect(() => this.actions$.pipe(
		ofType(Recipes.StoreRecipes, Recipes.AddRecipe, Recipes.UpdateRecipe, Recipes.DeleteRecipe),
		withLatestFrom(this.store.select(Recipes.NAME)),
		switchMap(([actionData, state]) =>
			this.http.put(RECIPES_URL, state.recipes)
		),
	), {dispatch: false});

	constructor (
		private actions$: Actions,
		private http: HttpClient,
		private store: Store<AppState>
	) {
	}
}
