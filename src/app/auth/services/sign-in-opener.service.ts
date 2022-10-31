import {Injectable} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Subject} from "rxjs";
import {SignInComponent} from "../sign-in/sign-in.component";

@Injectable()
export class SignInOpenerService {
	private _modal?: NgbModalRef;
	public readonly isOpenChanged = new Subject<boolean>();
	private _isOpen: boolean      = false;

	constructor (private modalService: NgbModal, private router: Router) {
		router.events.subscribe(event => {
			if (!(event instanceof NavigationStart)) return;
			const old    = this._isOpen;
			this._isOpen = event.url.includes("sign-in");
			if (this._isOpen !== old) {
				this.isOpenChanged.next(this._isOpen);
			}
			this._modal?.close();
		});
		this.onDismiss = this.onDismiss.bind(this);
	}

	get isOpen (): boolean {
		return this._isOpen;
	}

	private onDismiss () {
		this._modal  = undefined;
		this._isOpen = this.router.url.includes("sign-in");
		this.isOpenChanged.next(this._isOpen);
	}

	openSignInModal () {
		this._modal = this.modalService.open(SignInComponent, {size: "lg"});
		this._modal.hidden.subscribe(this.onDismiss);
		this._isOpen = true;
		this.isOpenChanged.next(this._isOpen);
		return this._modal;
	}
}
