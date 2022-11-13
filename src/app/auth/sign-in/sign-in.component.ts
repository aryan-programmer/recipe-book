import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";
import {map, Observable, take} from "rxjs";
import {AppState} from "../../reducers/app.store";
import * as Auth from "../reducer";

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
})
export class SignInComponent {
	isLoading$: Observable<boolean>;

	constructor (private store: Store<AppState>) {
		this.isLoading$ = this.store.select(Auth.NAME).pipe(map(v => v.isLoading));
		this.store.select(Auth.NAME).pipe(take(1)).subscribe(async auth => {
			if (auth.user != null) {
				this.store.dispatch(Auth.AlreadySignedIn({message: "Already signed in"}));
			}
		});
	}

	onSubmit (form: NgForm) {
		if (!form.valid) return;
		const {email, password} = form.value;
		this.store.dispatch(Auth.LoginStart({email, password}));
		form.reset();
	}
}
