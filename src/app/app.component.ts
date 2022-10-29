import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from "@angular/router";
import {NgbOffcanvas, NgbOffcanvasRef} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "./auth/services/auth.service";
import {DataStorageService} from "./services/data-storage.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
	sidenavOffcanvasRef?: NgbOffcanvasRef;

	constructor (
		private data: DataStorageService,
		private offcanvas: NgbOffcanvas,
		private router: Router,
		private auth: AuthService) {

	}

	ngOnInit () {
		this.auth.restoreUser();
	}


	open (content: TemplateRef<any>) {
		this.sidenavOffcanvasRef = this.offcanvas.open(content, {});
	}
}
