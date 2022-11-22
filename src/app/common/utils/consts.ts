let secrets = {FIREBASE_URL: "", API_KEY: ""};
try {
	const v = require("./private-data");
	secrets = {...v};
} catch (e) {
	console.error("Please specify the secrets in src/app/utils/private-data.ts");
}
export const FIREBASE_URL = secrets.FIREBASE_URL;
export const API_KEY      = secrets.API_KEY;

export const ERROR_MESSAGE = Symbol("ERROR_MESSAGE");

export const AUTH_SIGN_UP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY;
export const AUTH_SIGN_IN_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + API_KEY;
export const USER_DATA_KEY    = "userData";

export const USER_ID_PLACEHOLDER = "__$USER_ID$__";

export const RECIPES_URL = FIREBASE_URL + USER_ID_PLACEHOLDER + "/recipe.json";

declare module "@angular/common/http" {
	interface HttpErrorResponse {
		[ERROR_MESSAGE]?: string;
	}
}
