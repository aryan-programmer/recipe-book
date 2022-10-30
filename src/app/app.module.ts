import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {$404Component} from 'src/app/404/404.component';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {BlankComponent} from 'src/app/blank-component/blank.component';
import {ModalDefaultParametersService} from "../libs/modals/modal-default-parameters.service";
import {ModalsModule} from "../libs/modals/modals.module";
import {ModalsService} from "../libs/modals/modals.service";

import {AppComponent} from './app.component';
import {RegisterComponent} from './auth/register/register.component';
import {AuthGuard} from "./auth/services/auth.guard";
import {AuthInterceptor} from "./auth/services/auth.interceptor";
import {AuthService} from "./auth/services/auth.service";
import {SignInOpenerService} from "./auth/services/sign-in-opener.service";
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {IngredientListEditComponent} from './ingredient-list/ingredient-list-edit/ingredient-list-edit.component';
import {IngredientListComponent} from './ingredient-list/ingredient-list.component';
import {LoaderComponent} from './loader/loader.component';
import {RecipeDetailsComponent} from './recipes/recipe-details/recipe-details.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {RecipeListItemComponent} from './recipes/recipe-list/recipe-list-item/recipe-list-item.component';
import {RecipeListComponent} from './recipes/recipe-list/recipe-list.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipesResolver} from "./recipes/recipes.resolver";
import {DataStorageService} from "./services/data-storage.service";
import {ModalCustomParametersService} from "./services/modal-custom-parameters.service";
import {RecipeService} from './services/recipe.service';
import {ShoppingListService} from './services/shopping-list.service';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import { IngredientEditModalComponent } from './ingredient-edit-modal/ingredient-edit-modal.component';

@NgModule({
	declarations: [
		AppComponent,
		RecipesComponent,
		RecipeListComponent,
		RecipeDetailsComponent,
		ShoppingListComponent,
		IngredientListEditComponent,
		IngredientListComponent,
		RecipeListItemComponent,
		BlankComponent,
		RecipeEditComponent,
		$404Component,
		SidenavComponent,
		RegisterComponent,
		SignInComponent,
		LoaderComponent,
  IngredientEditModalComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule,
		NgbModule,
		ModalsModule,
	],
	providers: [
		{provide: ModalDefaultParametersService, useClass: ModalCustomParametersService},
		ModalsService,
		RecipeService,
		ShoppingListService,
		DataStorageService,
		RecipesResolver,
		AuthService,
		SignInOpenerService,
		AuthGuard,
		{provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterceptor},
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
