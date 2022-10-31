import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AppCommonModule} from "../common/app-common.module";
import {RegisterComponent} from "./register/register.component";
import {SignInComponent} from "./sign-in/sign-in.component";

const routes: Routes = [
	{path: 'sign-in', component: SignInComponent},
	{path: 'register', component: RegisterComponent},
];

@NgModule({
	declarations: [
		RegisterComponent,
		SignInComponent,
	],
	imports: [
		AppCommonModule,
		RouterModule.forChild(routes),
	],
	exports: [
		RouterModule,
	]
})
export class AuthModule {
}
