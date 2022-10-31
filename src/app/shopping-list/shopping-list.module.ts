import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {AppCommonModule} from "../common/app-common.module";
import {IngredientEditModalComponent} from "./ingredient-edit-modal/ingredient-edit-modal.component";
import {ShoppingListComponent} from "./shopping-list.component";

const routes: Routes = [
	{path: 'shopping-list', component: ShoppingListComponent},
];

@NgModule({
	imports: [
		AppCommonModule,
		FormsModule,
		RouterModule.forChild(routes),
	],
	declarations: [
		IngredientEditModalComponent,
		ShoppingListComponent
	],
	exports: [
		RouterModule
	]
})
export class ShoppingListModule {

}
