import {Ingredient} from './ingredient';

export type Recipe = {
	name: string;
	description: string;
	imageUrl: string;
	ingredients: Ingredient[];
};
