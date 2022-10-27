import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Ingredient} from '../structs/ingredient';

@Component({
	selector: 'app-ingredient-list',
	templateUrl: './ingredient-list.component.html'
})
export class IngredientListComponent {
	@Input() ingredients!: Ingredient[];
	@Input() showClick: boolean               = true;
	@Output() itemClick: EventEmitter<number> = new EventEmitter<number>();

	constructor () {
	}

	onClick (i: number) {
		this.itemClick.emit(i);
	}
}
