import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AppState} from "../reducers/app.store";
import * as ShoppingList from "../reducers/shopping-list";
import {IngredientEditModal} from "./ingredient-edit-modal/ingredient-edit.modal";

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit {
	shoppingListState$!: Observable<ShoppingList.State>;

	constructor (
		private modalService: NgbModal,
		private store: Store<AppState>
	) {
	}

	ngOnInit () {
		this.shoppingListState$ = this.store.select(ShoppingList.NAME);
	}

	onEditItem (i: number) {
		IngredientEditModal.open(this.modalService, i);
	}

	onAdd () {
		IngredientEditModal.open(this.modalService);
	}
}
