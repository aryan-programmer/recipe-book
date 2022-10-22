import {Ingredient} from './ingredient';

export interface Recipe {
	name: string;
	description: string;
	imageUrl: string;
	ingredients: Ingredient[];
}
