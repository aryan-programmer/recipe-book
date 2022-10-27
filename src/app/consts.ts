let furl = "";
try {
	const v = require("./private-data");
	furl = v.FIREBASE_URL;
} catch (e) {
	console.error("Please specify the FireBase Realtime Database URL in src/app/private-data.ts");
}
export const FIREBASE_URL = furl;

