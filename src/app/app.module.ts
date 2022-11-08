import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {ModalDefaultParametersService} from "../libs/modals/modal-default-parameters.service";
import {$404Module} from "./404/404.module";

import {AppComponent} from './app.component';
import {AuthGuard} from "./auth/services/auth.guard";
import {AuthInterceptor} from "./auth/services/auth.interceptor";
import {AuthService} from "./auth/services/auth.service";
import {SignInOpenerService} from "./auth/services/sign-in-opener.service";
import {AppCommonModule} from "./common/app-common.module";
import {RecipesResolver} from "./recipes/recipes.resolver";
import {DataStorageService} from "./services/data-storage.service";
import {ModalCustomParametersService} from "./services/modal-custom-parameters.service";
import {RecipeService} from './services/recipe.service';
import {ShoppingListService} from './services/shopping-list.service';
import {SidenavComponent} from './sidenav/sidenav.component';

@NgModule({
	declarations: [
		AppComponent,
		SidenavComponent,
	],
	imports: [
		BrowserModule,
		AppCommonModule,
		AppRoutingModule,
		$404Module,
	],
	providers: [
		{provide: ModalDefaultParametersService, useClass: ModalCustomParametersService},
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
