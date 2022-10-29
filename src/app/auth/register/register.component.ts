import {Component} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import modals from "../../../libs/modals";
import {ERROR_MESSAGE} from "../../utils/consts";
import {passwordsMatch} from "../../utils/functions";
import {AuthService} from "../services/auth.service";

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
})
export class RegisterComponent {
	form!: FormGroup;
	isLoading = false;

	constructor (private fb: FormBuilder, private auth: AuthService, private router: Router) {
		if (this.auth.isLoggedIn) {
			modals.alert("Already signed in", {size: "md"});
			this.router.navigateByUrl("/recipes");
			return;
		}
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
		this.isLoading          = true;
		this.auth.register(email, password).subscribe({
			next: async value => {
				this.isLoading = false;
				await this.router.navigateByUrl("/recipes");
				await modals.alert("<h4>Registered successfully.</h4>", {
					size: "md",
					bodyAsRawHtml: true,
				});
			},
			error: err => {
				this.isLoading = false;
				console.log(err);
				modals.alert(err[ERROR_MESSAGE], {
					size: "md",
					title: "Failed to register",
					okButtonClass: ["btn-danger"]
				});
			}
		});
		this.form.reset();
	}
}