import {Component, Injector, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {MODAL_DATA} from "../../libs/modals/types";
import {Unsubscriber} from "../../libs/unsubscriber";
import {ShoppingList, ShoppingListState} from "../reducers/shopping-list.reducer";
import {IngredientEditModal} from "./ingredient-edit-modal/ingredient-edit.modal";

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit {
	shoppingListState$!: Observable<ShoppingListState>;

	constructor (
		private modalService: NgbModal,
		private store: Store<{ [ShoppingList]: ShoppingListState }>
	) {
	}

	ngOnInit () {
		this.shoppingListState$ = this.store.select(ShoppingList);
	}

	onEditItem (i: number) {
		IngredientEditModal.open(this.modalService, i);
	}

	onAdd () {
		IngredientEditModal.open(this.modalService);
	}
}
