import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipeDetailsComponent} from 'src/app/recipes/recipe-details/recipe-details.component';
import {RecipeEditComponent} from 'src/app/recipes/recipe-edit/recipe-edit.component';
import {RecipesComponent} from 'src/app/recipes/recipes.component';
import {BlankComponent} from "../../libs/blank-component.module";
import {AuthGuard} from "../auth/services/auth.guard";
import {RecipesResolver} from "./recipes.resolver";

const recipeRoutes: Routes = [
	{
		path: '',
		component: RecipesComponent,
		canActivate: [AuthGuard],
		children: [
			{path: '', component: BlankComponent},
			{path: 'add', component: RecipeEditComponent},
			{path: ':idx', component: RecipeDetailsComponent, resolve: [RecipesResolver]},
			{path: ':idx/edit', component: RecipeEditComponent, resolve: [RecipesResolver]},
		]
	},
];

@NgModule({
	imports: [
		RouterModule.forChild(recipeRoutes)
	],
	exports: [RouterModule]
})
export class RecipesRoutingModule {
}
