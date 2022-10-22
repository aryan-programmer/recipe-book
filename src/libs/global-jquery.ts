import $ from "jquery";

window.jQuery = window.$ = $;
declare global {
	interface Window {
		jQuery: JQueryStatic;
		$: JQueryStatic;
	}
}
