import $ from "jquery";

declare global {
	interface JQueryStatic {
		events: {
			on: {
				mouse: {
					scroll: string,
					click: string,
					dblclick: string,
					down: string,
					up: string,
					move: string,
					over: string,
					out: string,
					enter: string,
					leave: string,
					mousedown: string,
					mouseup: string,
					mousemove: string,
					mouseover: string,
					mouseout: string,
					mouseenter: string,
					mouseleave: string
				},
				keyboard: {
					down: string,
					up: string,
					press: string,
					paste: string
				},
				browser: {
					load: string,
					resize: string,
					scroll: string,
					unload: string,
					error: string,
					paste: string
				},
				document: {
					load: string,
					unload: string
				},
				form: {
					blur: string,
					click: string,
					focus: string,
					focusin: string,
					focusout: string,
					change: string,
					select: string,
					submit: string
				},
				input: {
					blur: string,
					click: string,
					focus: string,
					focusin: string,
					focusout: string,
					change: string,
					select: string,
					submit: string,
					change_keyup_paste: string
				}
			}
		};
	}
}

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

// @ts-ignore
$.events = events;
