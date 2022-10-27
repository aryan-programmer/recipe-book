import {HttpClient} from "@angular/common/http";
import {Component} from '@angular/core';
import {map} from "rxjs";
import {DataStorageService} from "./services/data-storage.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor (private data: DataStorageService) {

	}

	saveData () {
		this.data.storeRecipes();
	}
}
