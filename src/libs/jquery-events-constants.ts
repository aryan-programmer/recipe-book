// tslint:disable-next-line:no-reference
/// <reference path="jquery-events-constants.d.ts" />
import $ from "jquery";

const events = {
	on: {
		mouse: {
			scroll: "scroll",
			click: "click",
			dblclick: "dblclick",
			down: "mousedown",
			up: "mouseup",
			move: "mousemove",
			over: "mouseover",
			out: "mouseout",
			enter: "mouseenter",
			leave: "mouseleave",
			mousedown: "mousedown",
			mouseup: "mouseup",
			mousemove: "mousemove",
			mouseover: "mouseover",
			mouseout: "mouseout",
			mouseenter: "mouseenter",
			mouseleave: "mouseleave"
		},
		keyboard: {
			down: "keydown",
			up: "keyup",
			press: "keypress",
			paste: "paste"
		},
		browser: {
			load: "load",
			resize: "resize",
			scroll: "scroll",
			unload: "unload",
			error: "error",
			paste: "paste"
		},
		document: {
			load: "load",
			unload: "unload"
		},
		form: {
			blur: "blur",
			click: "click",
			focus: "focus",
			focusin: "focusin",
			focusout: "focusout",
			change: "change",
			select: "select",
			submit: "submit"
		},
		input: {
			blur: "blur",
			click: "click",
			focus: "focus",
			focusin: "focusin",
			focusout: "focusout",
			change: "change",
			select: "select",
			submit: "submit",
			change_keyup_paste: "change keyup paste"
		}
	}
};

$.events = events;
