import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from '@ngrx/store';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {$404Module} from "./404/404.module";

import {AppComponent} from './app.component';
import {AuthEffects} from "./auth/reducer";
import {AuthGuard} from "./auth/services/auth.guard";
import {AuthInterceptor} from "./auth/services/auth.interceptor";
import {AuthService} from "./auth/services/auth.service";
import {AppCommonModule} from "./common/app-common.module";
import {RecipesResolver} from "./recipes/recipes.resolver";
import {reducers} from "./reducers/app.store";
import {DataStorageService} from "./services/data-storage.service";
import {RecipeService} from './services/recipe.service';
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
		StoreModule.forRoot(reducers,
			{
				runtimeChecks: {
					strictStateImmutability: true,
					strictActionImmutability: true,
					strictStateSerializability: true,
					strictActionSerializability: true,
				},
			}),
		EffectsModule.forRoot([AuthEffects])
	],
	providers: [
		RecipeService,
		DataStorageService,
		RecipesResolver,
		AuthService,
		AuthGuard,
		{provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterceptor},
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
