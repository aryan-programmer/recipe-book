import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {AppCommonModule} from "../common/app-common.module";
import {IngredientEditModal} from "./ingredient-edit-modal/ingredient-edit.modal";
import {ShoppingListComponent} from "./shopping-list.component";

const routes: Routes = [
	{path: '', component: ShoppingListComponent},
];

@NgModule({
	imports: [
		AppCommonModule,
		FormsModule,
		RouterModule.forChild(routes),
	],
	declarations: [
		IngredientEditModal,
		ShoppingListComponent
	],
	exports: [
		RouterModule
	]
})
export class ShoppingListModule {

}
