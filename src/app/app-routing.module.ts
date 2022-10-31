import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
	{path: '', redirectTo: '/recipes', pathMatch: 'full'},
	// {path: '**', redirectTo: "/404"},
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes, {useHash: true})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
