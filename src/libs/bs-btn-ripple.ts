import $ from "jquery";

// Courtesy of https://stackoverflow.com/questions/30074246/how-to-create-ripple-effect-on-click-material-design

// MAD-RIPPLE // (jQ+CSS)
$(document).on(
	"click",
	// language=JQuery-CSS
	"[data-ripple]:not(.disabled):not(:disabled)",
	function (e) {

		const $self = $(this);

		if ($self.is(".btn-disabled")) {
			return;
		}
		if ($self.closest("[data-ripple]")) {
			e.stopPropagation();
		}

		const initPos = $self.css("position");
		const offset = $self.offset();
		if (offset == null) return;
		const x = e.pageX - offset.left;
		const y = e.pageY - offset.top;
		const diameter = Math.min(this.offsetHeight, this.offsetWidth, 100); // start diameter
		const $ripple = $("<div/>", {class: "ripple", appendTo: $self});

		if (!initPos || initPos === "static") {
			$self.css({position: "relative"});
		}

		$("<div/>", {
			class: "rippleWave",
			css: {
				background: $self.data("ripple"),
				width: diameter,
				height: diameter,
				left: x - (diameter / 2),
				top: y - (diameter / 2),
			},
			appendTo: $ripple,
			one: {
				animationend () {
					$ripple.remove();
				}
			}
		});
	});
