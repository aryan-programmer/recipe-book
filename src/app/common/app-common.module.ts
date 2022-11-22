import {LayoutModule} from "@angular/cdk/layout";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatRippleModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
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
		LayoutModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		MatMenuModule,
		MatRippleModule,
		MatCardModule,
		MatInputModule,
		MatGridListModule,
		MatCardModule,
		MatMenuModule,
		MatIconModule,
		MatButtonModule,
		MatExpansionModule,
		MatDialogModule,
		LayoutModule,
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
		LayoutModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		MatMenuModule,
		MatRippleModule,
		MatCardModule,
		MatInputModule,
		MatGridListModule,
		MatCardModule,
		MatMenuModule,
		MatIconModule,
		MatButtonModule,
		MatExpansionModule,
		MatDialogModule,
		LayoutModule,
	],
})
export class AppCommonModule {

}
