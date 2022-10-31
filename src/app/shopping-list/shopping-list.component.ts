import {Component, Injector, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import nn from "../../libs/functions/nn";
import {MODAL_DATA} from "../../libs/modals/types";
import {Unsubscriber} from "../../libs/unsubscriber";
import {Ingredient} from '../common/utils/types';
import {ShoppingListService} from '../services/shopping-list.service';
import {DELETE_INGREDIENT, IngredientEditModalComponent} from "./ingredient-edit-modal/ingredient-edit-modal.component";

function modalDismissCatcher (reason: any) {
	if (reason && typeof reason !== "number") console.error(reason);
}

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent extends Unsubscriber implements OnInit {
	ingredients!: Ingredient[];

	constructor (public sls: ShoppingListService, private modalService: NgbModal) {
		super();
	}

	ngOnInit () {
		this.ingredients   = this.sls.ingredients;
		this.subscriptions = [this.sls.ingredientsChange.subscribe(
			(ingredients: Ingredient[]) => this.ingredients = ingredients)];
	}

	onEditItem (i: number) {
		let ing = this.sls.ingredients[i];
		this.modalService.open(IngredientEditModalComponent, {
			injector: Injector.create({providers: [{provide: MODAL_DATA, useValue: ing}]}),
			fullscreen: "lg",
			size: "xl",
			keyboard: false
		}).result.then(res => {
			if (res === DELETE_INGREDIENT) {
				this.sls.ingredients.splice(i, 1);
			} else {
				this.sls.ingredients[nn(i)] = res;
			}
		}).catch(modalDismissCatcher);
	}

	onAdd () {
		this.modalService.open(IngredientEditModalComponent, {
			fullscreen: "lg",
			size: "xl",
			keyboard: false
		}).result.then(res => {
			this.sls.ingredients.push(res);
		}).catch(modalDismissCatcher);
	}
}
