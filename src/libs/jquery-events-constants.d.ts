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
