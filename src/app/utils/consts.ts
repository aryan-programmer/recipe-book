let secrets = {FIREBASE_URL: "", API_KEY: ""};
try {
	const v = require("./private-data");
	secrets = {...v};
} catch (e) {
	console.error("Please specify the secrets in src/app/utils/private-data.ts");
}
export const FIREBASE_URL = secrets.FIREBASE_URL;
export const API_KEY      = secrets.API_KEY;

export const NAV_BG_CLASS = "navbar navbar-expand-lg navbar-light bg-gradient--perfect-white";

export const ERROR_MESSAGE = Symbol("ERROR_MESSAGE");

declare module "@angular/common/http" {
	interface HttpErrorResponse{
		[ERROR_MESSAGE]?: string;
	}
}
