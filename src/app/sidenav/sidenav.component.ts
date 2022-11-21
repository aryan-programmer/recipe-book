import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {Unsubscriber} from "../../libs/unsubscriber";
import * as Auth from "../auth/reducer";
import * as Recipes from "../recipes/reducers";
import {AppState} from "../reducers/app.store";

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	host: {"class": `align-items-start`}
})
export class SidenavComponent extends Unsubscriber implements OnInit {
	@Input() showClose = false;
	@Output() close    = new EventEmitter<void>();
	isLoggedIn         = false;

	constructor (
		private router: Router,
		private store: Store<AppState>) {
		super();
	}

	ngOnInit () {
		this.subscriptions = [
			this.router.events.subscribe(event => {
				if (!(event instanceof NavigationStart)) return;
				this.close.emit();
			}),
			this.store.select(Auth.NAME).subscribe(auth => {
				this.isLoggedIn = auth.user != null;
			}),
		];
	}

	saveData () {
		this.store.dispatch(Recipes.StoreRecipes());
		this.close.emit();
	}

	fetchData () {
		this.store.dispatch(Recipes.FetchRecipes());
		this.close.emit();
	}

	signOut () {
		this.store.dispatch(Auth.Logout());
	}
}
