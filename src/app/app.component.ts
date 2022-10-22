import {HttpClient} from "@angular/common/http";
import {Component} from '@angular/core';
import {map} from "rxjs";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	/*loadedPosts: PostWithId[] = [];

	constructor (private http: HttpClient) {
		this.fetchPosts();
	}

	onFetchPosts () {
		this.fetchPosts();
	}

	private fetchPosts () {
		this.http
			.get<PostsObject>(FIREBASE_BASE_URL + "posts.json")
			.pipe(map((value: PostsObject) => {
				const res: PostWithId[] = [];
				for (const key in value) {
					if (!value.hasOwnProperty(key)) continue;
					res.push({...value[key], id: key});
				}
				return res;
			}))
			.subscribe(value => {
				this.loadedPosts = value;
			});
	}

	onClearPosts () {

	}

	onCreatePost (formData: Post) {
		console.log(formData);
		this.http
			.post(FIREBASE_BASE_URL + "posts.json", formData)
			.subscribe(value => {
				console.log(value);
			});
	}*/
}
