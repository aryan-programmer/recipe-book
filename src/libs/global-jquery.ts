import $ from "jquery";
import "./bs-btn-ripple";

window.jQuery = window.$ = $;
declare global {
	interface Window {
		jQuery: JQueryStatic;
		$: JQueryStatic;
	}
}

require("@popperjs/core");
const bs = require("bootstrap");

window.bootstrap = bs;
declare global {
	interface Window {
		bootstrap: any;
	}
}

