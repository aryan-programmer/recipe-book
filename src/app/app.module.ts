import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {$404Component} from 'src/app/404/404.component';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {BlankComponent} from 'src/app/blank-component/blank.component';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {IngredientListComponent} from './ingredient-list/ingredient-list.component';
import {NewIngredientFieldsComponent} from './new-ingredient-fields/new-ingredient-fields.component';
import {RecipeDetailsComponent} from './recipes/recipe-details/recipe-details.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {RecipeListItemComponent} from './recipes/recipe-list/recipe-list-item/recipe-list-item.component';
import {RecipeListComponent} from './recipes/recipe-list/recipe-list.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipeService} from './services/recipe.service';
import {ShoppingListService} from './services/shopping-list.service';
import {ShoppingListEditComponent} from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		RecipesComponent,
		RecipeListComponent,
		RecipeDetailsComponent,
		ShoppingListComponent,
		ShoppingListEditComponent,
		IngredientListComponent,
		RecipeListItemComponent,
		BlankComponent,
		RecipeEditComponent,
		NewIngredientFieldsComponent,
		$404Component
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [RecipeService, ShoppingListService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
