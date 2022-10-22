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
require("bootstrap");
