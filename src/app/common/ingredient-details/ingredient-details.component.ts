import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from '../utils/types';

@Component({
	selector: 'app-ingredient-details',
	templateUrl: './ingredient-details.component.html'
})
export class IngredientDetailsComponent{
	@Input() ingredient!: Ingredient;
}
