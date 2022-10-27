import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {$404Component} from 'src/app/404/404.component';
import {BlankComponent} from 'src/app/blank-component/blank.component';
import {RecipeDetailsComponent} from 'src/app/recipes/recipe-details/recipe-details.component';
import {RecipeEditComponent} from 'src/app/recipes/recipe-edit/recipe-edit.component';
import {RecipesComponent} from 'src/app/recipes/recipes.component';
import {ShoppingListComponent} from 'src/app/shopping-list/shopping-list.component';
import {RecipesResolver} from "./recipes/recipes.resolver";

const appRoutes: Routes = [
	{path: '', redirectTo: '/recipes', pathMatch: 'full'},
	{
		path: 'recipes', component: RecipesComponent,
		children: [
			{path: '', component: BlankComponent},
			{path: 'add', component: RecipeEditComponent},
			{path: ':idx', component: RecipeDetailsComponent, resolve: [RecipesResolver]},
			{path: ':idx/edit', component: RecipeEditComponent, resolve: [RecipesResolver]},
		]
	},
	{path: 'shopping-list', component: ShoppingListComponent},
	{path: '404', component: $404Component},
	{path: '**', redirectTo: '/404'}
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes, {useHash: true})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
