export type Ingredient = {
	name: string;
	quantity: [number, string];
	cost: number;
}

export type Recipe = {
	name: string;
	description: string;
	imageUrl: string;
	ingredients: Ingredient[];
};
