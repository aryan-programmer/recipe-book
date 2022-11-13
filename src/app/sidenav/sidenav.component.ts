import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {Unsubscriber} from "../../libs/unsubscriber";
import * as Auth from "../auth/reducer";
import {NAV_BG_CLASS} from "../common/utils/consts";
import {AppState} from "../reducers/app.store";
import {DataStorageService} from "../services/data-storage.service";

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	host: {"class": `${NAV_BG_CLASS} align-items-start`}
})
export class SidenavComponent extends Unsubscriber implements OnInit {
	@Input() showClose = false;
	@Output() close    = new EventEmitter<void>();
	isLoggedIn         = false;

	constructor (
		private data: DataStorageService,
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
		this.data.storeRecipes().subscribe();
		this.close.emit();
	}

	fetchData () {
		this.data.fetchRecipes()?.subscribe();
		this.close.emit();
	}

	signOut () {
		this.store.dispatch(Auth.Logout());
	}
}
