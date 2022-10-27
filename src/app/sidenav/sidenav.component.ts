import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NAV_BG_CLASS} from "../consts";
import {DataStorageService} from "../services/data-storage.service";

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	host: {"class": `${NAV_BG_CLASS} align-items-start`}
})
export class SidenavComponent {
	@Input() showClose = false;
	@Output() close    = new EventEmitter<void>();

	constructor (private data: DataStorageService) {

	}

	saveData () {
		this.data.storeRecipes().subscribe();
		this.close.emit();
	}

	fetchData () {
		this.data.fetchRecipes().subscribe();
		this.close.emit();
	}
}
