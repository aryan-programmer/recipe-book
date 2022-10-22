import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HasSubscriptions} from 'src/libs/HasSubscriptions';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent extends HasSubscriptions {
	id?: number;
	editMode = false;

	constructor (private activatedRoute: ActivatedRoute) {
		super();
		this.subscriptions = [
			activatedRoute.params.subscribe(params => {
				this.id = +params.id;
				this.editMode = params.id != null;
			})
		];
	}
}
