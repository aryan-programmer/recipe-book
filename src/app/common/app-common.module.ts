import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BlankComponentModule} from "../../libs/blank-component.module";
import {ModalsModule} from "../../libs/modals/modals.module";
import {IngredientDetailsComponent} from "./ingredient-details/ingredient-details.component";
import {LoaderComponent} from "./loader/loader.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		BlankComponentModule,
		ModalsModule,
		NgbModule,
	],
	declarations: [
		IngredientDetailsComponent,
		LoaderComponent,
	],
	exports: [
		IngredientDetailsComponent,
		LoaderComponent,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		BlankComponentModule,
		ModalsModule,
		NgbModule,
	]
})
export class AppCommonModule {

}
