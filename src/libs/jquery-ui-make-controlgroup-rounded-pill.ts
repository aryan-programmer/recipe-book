// tslint:disable-next-line:no-reference
///<reference path="../../node_modules/@types/jqueryui/index.d.ts"/>
import $ from "jquery";

declare global {
	interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
		makeControlgroupRoundedPill (): JQuery<TElement>;
	}
}

$.fn.makeControlgroupRoundedPill =
	function () {
		const elems = this
			.children(
				":not(.ui-helper-hidden-accessible)")
			.filter(":visible");

		const dir =
			// @ts-ignore
			this.controlgroup("option", "direction").toString() ||
			this.buttonset("option", "direction").toString();

		if (dir === "vertical") {
			elems[0].classList.add("rounded-pill-top");
			elems[elems.length - 1].classList.add("rounded-pill-bottom");
		} else if (dir === "horizontal") {
			elems[0].classList.add("rounded-pill-left");
			elems[elems.length - 1].classList.add("rounded-pill-right");
		}

		return this;
	};
