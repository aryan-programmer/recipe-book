import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {map, tap} from "rxjs";
import {AuthService} from "../auth/services/auth.service";
import {FIREBASE_URL} from "../common/utils/consts";
import {Recipe} from "../common/utils/types";
import {RecipeService} from "./recipe.service";

const RECIPES_URL = FIREBASE_URL + "recipe.json";

@Injectable()
export class DataStorageService {
	constructor (
		private http: HttpClient,
		private rec: RecipeService,
		private auth: AuthService,
	) {
	}

	storeRecipes () {
		const recipes = this.rec.recipes;
		return this.http.put(RECIPES_URL, recipes);
	}

	fetchRecipes () {
		return this.http
			.get<Recipe[]>(
				RECIPES_URL,
			)
			.pipe(
				map(value => {
					return value.map(r => {
						return {
							name: r.name ?? "",
							description: r.description ?? "",
							imageUrl: r.imageUrl ?? "",
							ingredients: r.ingredients ?? [],
						} as Recipe;
					});
				}),
				tap(value => {
					this.rec.recipes = value;
				})
			);
	}
}
