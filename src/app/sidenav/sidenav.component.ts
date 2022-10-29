import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import modals from "../../libs/modals";
import {Unsubscriber} from "../../libs/unsubscriber";
import {AuthService} from "../auth/services/auth.service";
import {SignInOpenerService} from "../auth/services/sign-in-opener.service";
import {DataStorageService} from "../services/data-storage.service";
import {NAV_BG_CLASS} from "../utils/consts";

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	host: {"class": `${NAV_BG_CLASS} align-items-start`}
})
export class SidenavComponent extends Unsubscriber implements OnInit{
	@Input() showClose    = false;
	@Output() close       = new EventEmitter<void>();
	isSignInPage: boolean = false;
	isLoggedIn = false;

	constructor (
		private data: DataStorageService,
		private auth: AuthService,
		private router: Router,
		private signInOpener: SignInOpenerService) {
		super();
	}

	ngOnInit () {
		this.isSignInPage  = this.signInOpener.isOpen;
		this.isLoggedIn = this.auth.isLoggedIn;
		this.subscriptions = [
			this.router.events.subscribe(event => {
				if (!(event instanceof NavigationStart)) return;
				this.close.emit();
			}),
			this.signInOpener.isOpenChanged.subscribe(value => {
				this.isSignInPage = value;
			}),
			this.auth.user.subscribe(user => {
				this.isLoggedIn = this.auth.isLoggedIn;
			}),
		];
	}

	saveData () {
		this.data.storeRecipes().subscribe();
		this.close.emit();
	}

	fetchData () {
		this.data.fetchRecipes()?.subscribe();
		this.close.emit();
	}

	openSignIn () {
		if (this.isSignInPage) return;
		this.signInOpener.openSignInModal()
		this.close.emit();
	}

	signOut () {
		this.auth.signOut();
		modals.alert("Logged out successfully", {size: "md"});
	}
}