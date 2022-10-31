import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AppCommonModule} from "../common/app-common.module";
import {RecipeDetailsComponent} from "./recipe-details/recipe-details.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeListItemComponent} from "./recipe-list/recipe-list-item/recipe-list-item.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipesRoutingModule} from "./recipes-routing.module";
import {RecipesComponent} from "./recipes.component";

@NgModule({
	imports: [
		AppCommonModule,
		RecipesRoutingModule
	],
	declarations: [
		RecipesComponent,
		RecipeListComponent,
		RecipeDetailsComponent,
		RecipeEditComponent,
		RecipeListItemComponent
	],
	exports: [
		RouterModule
	]
})
export class RecipesModule {

}
