import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {AppRoutingModule} from 'src/app/app-routing.module';
import {environment} from "../environments/environment";
import {ModalDefaultParametersService} from "../libs/modals/modal-default-parameters.service";
import {$404Module} from "./404/404.module";

import {AppComponent} from './app.component';
import {AuthEffects} from "./auth/reducer";
import {AuthGuard} from "./auth/services/auth.guard";
import {AuthInterceptor} from "./auth/services/auth.interceptor";
import {AuthService} from "./auth/services/auth.service";
import {AppCommonModule} from "./common/app-common.module";
import {RecipesResolver} from "./recipes/recipes.resolver";
import {RecipesEffects} from "./recipes/reducers";
import {reducers} from "./reducers/app.store";
import {ModalCustomParametersService} from "./services/modal-custom-parameters.service";
import {SidenavComponent} from './sidenav/sidenav.component';

@NgModule({
	declarations: [
		AppComponent,
		SidenavComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppCommonModule,
		AppRoutingModule,
		$404Module,
		StoreModule.forRoot(
			reducers,
			{
				runtimeChecks: {
					strictStateImmutability: true,
					strictActionImmutability: true,
					strictStateSerializability: true,
					strictActionSerializability: true,
				},
			}),
		EffectsModule.forRoot([AuthEffects, RecipesEffects]),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
			autoPause: true,
		}),
	],
	providers: [
		RecipesResolver,
		AuthService,
		AuthGuard,
		{provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterceptor},
		{provide: ModalDefaultParametersService, useClass: ModalCustomParametersService},
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
