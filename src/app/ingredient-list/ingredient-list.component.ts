import {Component, Input} from '@angular/core';
import {Ingredient} from '../structs/ingredient';

@Component({
	selector: 'app-ingredient-list',
	templateUrl: './ingredient-list.component.html',
	styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent {
	@Input() ingredients: Ingredient[];

	constructor () {
	}
}
