import {Component} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {map, Observable, take} from "rxjs";
import {passwordsMatch} from "../../common/utils/functions";
import {AppState} from "../../reducers/app.store";
import * as Auth from "../reducer";

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
})
export class RegisterComponent {
	form!: FormGroup;
	isLoading$: Observable<boolean>;

	constructor (
		private fb: FormBuilder,
		private store: Store<AppState>,
	) {
		this.isLoading$ = this.store.select(Auth.NAME).pipe(map(v => v.isLoading));
		this.store.select(Auth.NAME).pipe(take(1)).subscribe(async auth => {
			if (auth.user != null) {
				this.store.dispatch(Auth.AlreadySignedIn({message: "Already signed in"}));
			}
		});
		this.form = this.fb.group({
			"email": [null, [Validators.required, Validators.email]],
			"password": [null, [Validators.required, Validators.minLength(6)]],
			"password2": [null, [Validators.required, Validators.minLength(6)]],
		}, {validators: passwordsMatch("password", "password2")} as AbstractControlOptions);
	}

	get email () {
		return this.form.controls["email"]
	}

	get password () {
		return this.form.controls["password"]
	}

	get password2 () {
		return this.form.controls["password2"]
	}

	onSubmit () {
		if (!this.form.valid) return;
		const {email, password} = this.form.value;
		this.store.dispatch(Auth.RegisterStart({email, password}));
		this.form.reset();
	}
}
