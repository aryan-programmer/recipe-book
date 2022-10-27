import {Component, TemplateRef} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {NgbOffcanvas, NgbOffcanvasRef} from "@ng-bootstrap/ng-bootstrap";
import {DataStorageService} from "./services/data-storage.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {
	sidenavOffcanvasRef?: NgbOffcanvasRef;

	constructor (private data: DataStorageService, private offcanvas: NgbOffcanvas, private router: Router) {
		router.events.subscribe(event => {
			if (!(event instanceof NavigationStart)) return;
			if (this.sidenavOffcanvasRef == null) return;
			this.sidenavOffcanvasRef.close();
		})
	}

	saveData () {
		this.data.storeRecipes();
	}

	open (content: TemplateRef<any>) {
		this.sidenavOffcanvasRef = this.offcanvas.open(content, {});
	}
}
