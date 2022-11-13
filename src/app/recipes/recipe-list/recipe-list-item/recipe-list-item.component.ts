import {Component, Input} from '@angular/core';
import {Recipe} from 'src/app/common/utils/types';

@Component({
	selector: 'app-recipe-list-item',
	templateUrl: './recipe-list-item.component.html'
})
export class RecipeListItemComponent {
	@Input() index!: number;
	@Input() recipe!: Recipe;
	@Input() isSelected!: boolean;
}
