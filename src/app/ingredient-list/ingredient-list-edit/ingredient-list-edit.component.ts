import {Component, Injector, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import nn from "../../../libs/functions/nn";
import {MODAL_DATA} from "../../../libs/modals/types";
import {Unsubscriber} from "../../../libs/unsubscriber";
import {
	DELETE_INGREDIENT,
	IngredientEditModalComponent
} from "../../ingredient-edit-modal/ingredient-edit-modal.component";
import {ShoppingListService} from "../../services/shopping-list.service";

function modalDismissCatcher(reason:any) {
	if (reason && typeof reason !== "number") console.error(reason);
}

@Component({
	selector: 'app-ingredient-list-edit',
	templateUrl: './ingredient-list-edit.component.html'
})
export class IngredientListEditComponent extends Unsubscriber implements OnInit {
	constructor (private ingredients: ShoppingListService, private modalService: NgbModal) {
		super();
	}

	ngOnInit () {
	}

	onAdd () {
		this.modalService.open(IngredientEditModalComponent, {
			fullscreen: "lg",
			size: "xl",
			keyboard: false
		}).result.then(res => {
			this.ingredients.ingredients.push(res);
		}).catch(modalDismissCatcher);
	}

	onEditItem (i: number) {
		let ing = this.ingredients.ingredients[i];
		this.modalService.open(IngredientEditModalComponent, {
			injector: Injector.create({providers: [{provide: MODAL_DATA, useValue: ing}]}),
			fullscreen: "lg",
			size: "xl",
			keyboard: false
		}).result.then(res => {
			if (res === DELETE_INGREDIENT) {
				this.ingredients.ingredients.splice(i, 1);
			} else {
				this.ingredients.ingredients[nn(i)] = res;
			}
		}).catch(modalDismissCatcher);
	}
}
