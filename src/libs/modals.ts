import $ from 'jquery';
import ModalAlreadyShownError from './functions/modal-already-shown-error';
import nn from './functions/nn';

interface ModalParams {
	title?: string;
	size?: 'xl' | 'lg' | 'md' | 'sm';
	okButtonText?: string;
	cancelButtonText?: string;
	bodyAsRawHtml?: boolean;
}

// region ...InputType
type InputType = 'button' |
	'checkbox' |
	'color' |
	'date' |
	'datetime-local' |
	'email' |
	'file' |
	'hidden' |
	'image' |
	'month' |
	'number' |
	'password' |
	'radio' |
	'range' |
	'reset' |
	'search' |
	'submit' |
	'tel' |
	'text' |
	'time' |
	'url' |
	'week';
// endregion InputType

let $modal: JQuery<HTMLDivElement>;
let dom$dialog: HTMLDivElement;
let dom$title: HTMLElement;
let dom$body: HTMLDivElement;
let dom$buttonsHolder: HTMLDivElement;
let dom$closeButton: HTMLButtonElement;
let dom$okButton: HTMLButtonElement;
let dom$cancelButton: HTMLButtonElement;
let isModalAlreadyShown: boolean = false;
let wasInitialized: boolean = false;
let defaultParams: {
	title: string;
	size: 'xl' | 'lg' | 'md' | 'sm';
	okButtonText: string;
	cancelButtonText: string;
	bodyAsRawHtml: boolean;
} = {
	title: '',
	size: 'md',
	okButtonText: 'Ok',
	cancelButtonText: 'Cancel',
	bodyAsRawHtml: false,
};

function getClassFromSz (size: 'xl' | 'lg' | 'md' | 'sm'): string {
	return 'modal-' + size;
}

function init (params: ModalParams) {
	if (wasInitialized) {
		return;
	}
	document.body.innerHTML += `<div
	class="modal fade"
	data-backdrop="static"
	id="--general-modal-dialog"
	tabindex="-1"
>
	<!--
	Style from https://webgradients.com/, 162 Perfect White
	-->
	<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" id="--general-modal-dialog--dialog">
		<div
			class="modal-content border-0"
			style="
			background: radial-gradient(circle farthest-side at bottom, #E3FDF5 0%, #FFE6FA 100%);
			color: #212529;"
		>
			<div class="modal-header add-bg-noise border-bottom-0">
				<h2 id="--general-modal-dialog--title" class="modal-title bold"></h2>
				<button
					id="--general-modal-dialog--close-button"
					class="close bold"
					data-dismiss="modal"
					type="button"
				>&times;
				</button>
			</div>
			<div id="--general-modal-dialog--body" class="modal-body">
			</div>
			<div
				id="--general-modal-dialog--buttons-holder"
				class="modal-footer add-bg-noise mb-0 border-top-0 d-flex justify-content-end">
				<button
					id="--general-modal-dialog--ok-button"
					class="btn btn-image bg-gradient-success-info rounded-pill px-5"
					type="button"
					data-dismiss="modal"
				>Ok
				</button>
				<button
					id="--general-modal-dialog--cancel-button"
					class="btn btn-image bg-gradient-danger-warning rounded-pill px-5 d-none"
					type="button"
					data-dismiss="modal"
				>Cancel
				</button>
			</div>
		</div>
	</div>
</div>`;
	$modal = $('#--general-modal-dialog');
	dom$dialog = nn(document.getElementById('--general-modal-dialog--dialog')) as HTMLDivElement;
	dom$title = nn(document.getElementById('--general-modal-dialog--title'));
	dom$body = nn(document.getElementById('--general-modal-dialog--body')) as HTMLDivElement;
	dom$buttonsHolder = nn(document.getElementById('--general-modal-dialog--buttons-holder')) as HTMLDivElement;
	dom$closeButton = nn(document.getElementById('--general-modal-dialog--close-button')) as HTMLButtonElement;
	dom$okButton = nn(document.getElementById('--general-modal-dialog--ok-button')) as HTMLButtonElement;
	dom$cancelButton = nn(document.getElementById('--general-modal-dialog--cancel-button')) as HTMLButtonElement;
	defaultParams = Object.assign(defaultParams, params);
	wasInitialized = true;
}

function alert (
	body: string,
	params: ModalParams = defaultParams
): Promise<void> {
	return new Promise<void>((
		resolve: (value?: (PromiseLike<void> | void)) => void,
		reject: (reason?: any) => void
	) => {
		if (isModalAlreadyShown) {
			reject(new ModalAlreadyShownError('A modal is already being shown, please let the user close it first.'));
			return;
		}
		isModalAlreadyShown = true;

		const {okButtonText, size, title, bodyAsRawHtml} = Object.assign({}, defaultParams, params);

		dom$title.innerText = title;
		if (bodyAsRawHtml) {
			dom$body.innerHTML = body;
		} else {
			dom$body.innerText = body;
		}
		dom$okButton.innerText = okButtonText;
		const sizeClass = getClassFromSz(size);
		dom$dialog.classList.add(sizeClass);

		// @ts-ignore
		$modal.modal('show');
		$modal.on('hidden.bs.modal', function fn () {
			$modal.off('hidden.bs.modal', fn);
			dom$dialog.classList.remove(sizeClass);
			isModalAlreadyShown = false;
			resolve();
		});
	});
}

function confirm (
	body: string,
	params: ModalParams = defaultParams
): Promise<boolean | null> {
	return new Promise<boolean | null>((
		resolve: (value?: (PromiseLike<boolean | null> | boolean | null)) => void,
		reject: (reason?: any) => void
	) => {
		if (isModalAlreadyShown) {
			reject(new ModalAlreadyShownError('A modal is already being shown, please let the user close it first.'));
			return;
		}
		isModalAlreadyShown = true;

		const {cancelButtonText, okButtonText, size, title, bodyAsRawHtml} =
			Object.assign({}, defaultParams, params);

		dom$title.innerText = title;
		if (bodyAsRawHtml) {
			dom$body.innerHTML = body;
		} else {
			dom$body.innerText = body;
		}
		dom$okButton.innerText = okButtonText;
		dom$cancelButton.innerText = cancelButtonText;
		dom$buttonsHolder.classList.remove('justify-content-end');
		dom$buttonsHolder.classList.add('justify-content-around');
		dom$cancelButton.classList.remove('d-none');
		const sizeClass = getClassFromSz(size);
		dom$dialog.classList.add(sizeClass);

		let valueToResolveTo: boolean | null = null;

		function addEventListener (
			buttonElement: HTMLButtonElement,
			resolveValue: boolean | null,
		) {
			function fn () {
				buttonElement.onclick = buttonElement.onkeyup = null;
				valueToResolveTo = resolveValue;
			}

			buttonElement.onclick = buttonElement.onkeyup = fn;
		}

		addEventListener(dom$okButton, true);
		addEventListener(dom$cancelButton, false);

		// @ts-ignore
		$modal.modal('show');
		$modal.on('hidden.bs.modal', function fn () {
			$modal.off('hidden.bs.modal', fn);
			dom$dialog.classList.remove(sizeClass);
			dom$buttonsHolder.classList.add('justify-content-end');
			dom$buttonsHolder.classList.remove('justify-content-around');
			dom$cancelButton.classList.add('d-none');
			isModalAlreadyShown = false;
			resolve(valueToResolveTo);
		});
	});
}

function prompt (
	body: string,
	params: ModalParams & { type?: InputType } = defaultParams
): Promise<string> {
	return new Promise<string>((
		resolve: (value?: (PromiseLike<string> | string)) => void,
		reject: (reason?: any) => void) => {
		if (isModalAlreadyShown) {
			reject(new ModalAlreadyShownError('A modal is already being shown, please let the user close it first.'));
			return;
		}
		isModalAlreadyShown = true;

		const {type, okButtonText, size, title, bodyAsRawHtml} =
			Object.assign({}, defaultParams, params);

		dom$title.innerText = title;
		if (bodyAsRawHtml) {
			dom$body.innerHTML = body;
		} else {
			dom$body.innerText = body;
		}
		dom$body.innerHTML += `
<div class="row">
	<div class="col-md-2"></div>
	<div class="col-md-10 p-0 m-0">
		<input
			id="--general-modal-dialog--input"
			class="form-control rounded-pill"
			type="${type}"
			value=""
		>
	</div>
</div>`;
		dom$okButton.innerText = okButtonText;
		const sizeClass = getClassFromSz(size);
		dom$dialog.classList.add(sizeClass);
		dom$okButton.removeAttribute('data-dismiss');
		dom$closeButton.removeAttribute('data-dismiss');

		const dom$input = nn(
			dom$body.querySelector('#--general-modal-dialog--input')
		) as HTMLInputElement | HTMLSelectElement;

		// @ts-ignore
		$modal.modal('show');

		let valueToResolveTo: string = '';

		function fn () {
			if (dom$input.reportValidity()) {
				dom$okButton.onclick = dom$okButton.onkeyup =
					dom$closeButton.onclick = dom$closeButton.onkeyup =
						dom$input.onkeyup = null;
				// @ts-ignore
				$modal.modal('hide');
				valueToResolveTo = dom$input.value;
			}
		}

		dom$input.onkeyup = (ev: KeyboardEvent) => {
			if (ev.key === 'Enter') {
				fn();
			}
		};

		dom$okButton.onclick = dom$okButton.onkeyup =
			dom$closeButton.onclick = dom$closeButton.onkeyup = fn;

		$modal.on('hidden.bs.modal', function fn_ () {
			$modal.off('hidden.bs.modal', fn_);
			dom$okButton.setAttribute('data-dismiss', 'modal');
			dom$closeButton.setAttribute('data-dismiss', 'modal');
			dom$dialog.classList.remove(sizeClass);
			isModalAlreadyShown = false;
			resolve(valueToResolveTo);
		});
	});
}

const modals = {init, alert, confirm, prompt};

export default modals;
export {ModalParams, InputType, modals};
