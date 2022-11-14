import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Actions, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {map, Observable, of, switchMap, take} from 'rxjs';
import {Recipe} from "../common/utils/types";
import * as Recipes from "../recipes/reducers";
import {AppState} from "../reducers/app.store";

@Injectable()
export class RecipesResolver implements Resolve<Recipe[]> {
	constructor (
		private store: Store<AppState>,
		private actions$: Actions,
	) {
	}

	resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Recipe[] {
		return this.store.select(Recipes.NAME).pipe(
			take(1),
			switchMap(value => {
				const r = value.recipes;
				if (r == null || r.length === 0) {
					this.store.dispatch(Recipes.FetchRecipes());
					return this.actions$.pipe(
						ofType(Recipes.SetRecipes),
						take(1),
						map(value => value.recipes)
					);
				}
				return of(r);
			}));
	}
}
