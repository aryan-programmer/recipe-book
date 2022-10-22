import {Component, Input} from '@angular/core';
import {Recipe} from 'src/app/structs/recipe';

@Component({
	selector: 'app-recipe-list-item',
	templateUrl: './recipe-list-item.component.html',
	styleUrls: ['./recipe-list-item.component.css']
})
export class RecipeListItemComponent {
	@Input() recipe: Recipe;
	@Input() isSelected: boolean;

	constructor () {
	}
}
