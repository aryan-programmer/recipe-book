import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import * as Auth from "./auth/reducer";
import {AppState} from "./reducers/app.store";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
	isSmallish$: Observable<boolean> = this.breakpointObserver.observe([
		Breakpoints.Medium,
		Breakpoints.Large,
		Breakpoints.XLarge
	])
		.pipe(
			map(result => !result.matches),
			shareReplay()
		);

	constructor (
		private store: Store<AppState>,
		private breakpointObserver: BreakpointObserver
	) {
	}

	ngOnInit () {
		this.store.dispatch(Auth.RestoreUser());
	}
}
