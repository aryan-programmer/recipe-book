import {Component, OnInit} from '@angular/core';
import {DataStorageService} from "../services/data-storage.service";

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss'],
	host: {"class": "navbar navbar-expand-lg navbar-light bg-gradient--perfect-white align-items-start"}
})
export class SidenavComponent {

	constructor (private data: DataStorageService) {

	}

	saveData () {
		this.data.storeRecipes().subscribe();
	}

	fetchData () {
		this.data.fetchRecipes().subscribe();
	}
}
