import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {map, Observable} from "rxjs";
import {Recipe} from '../../common/utils/types';
import * as Recipes from "../../recipes/reducers";
import {AppState} from "../../reducers/app.store";

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent {
	recipes$: Observable<Recipe[]>;

	constructor (private store: Store<AppState>) {
		this.recipes$ = store.select(Recipes.NAME).pipe(map(value => value.recipes));
	}
}
