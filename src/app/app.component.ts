import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgbOffcanvas, NgbOffcanvasRef} from "@ng-bootstrap/ng-bootstrap";
import {Store} from "@ngrx/store";
import * as Auth from "./auth/reducer";
import {AppState} from "./reducers/app.store";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
	sidenavOffcanvasRef?: NgbOffcanvasRef;

	constructor (
		private offcanvas: NgbOffcanvas,
		private store: Store<AppState>,
	) {
	}

	ngOnInit () {
		this.store.dispatch(Auth.RestoreUser());
	}

	open (content: TemplateRef<any>) {
		this.sidenavOffcanvasRef = this.offcanvas.open(content, {});
	}
}
