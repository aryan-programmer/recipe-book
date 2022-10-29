import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DataStorageService} from "../services/data-storage.service";
import {RecipeService} from "../services/recipe.service";
import {Recipe} from "../utils/types";

@Injectable()
export class RecipesResolver implements Resolve<Recipe[]> {
	constructor (private data: DataStorageService, private recipes: RecipeService) {
	}

	resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Recipe[] {
		const r = this.recipes.recipes;
		if (r == null || r.length === 0)
			return this.data.fetchRecipes() ?? [];
		return r;
	}
}
