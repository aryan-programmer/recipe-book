import {Component, Optional} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalsService} from "../../../libs/modals/modals.service";
import {redirectTo} from "../../app-routing.module";
import {ERROR_MESSAGE} from "../../utils/consts";
import {AuthService} from "../services/auth.service";

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
})
export class SignInComponent {
	isLoading = false;

	constructor (
		private auth: AuthService,
		private router: Router,
		private modals: ModalsService,
		@Optional() private activeModal?: NgbActiveModal
	) {
		if(this.auth.isLoggedIn){
			if(activeModal == null){
				this.router.navigateByUrl("/recipes");
			}else{
				redirectTo(this.router, this.router.url);
				this.close();
			}
			modals.alert("Already signed in",{size: "md"});
			return;
		}
	}

	close () {
		this.activeModal?.close();
	}

	onSubmit (form: NgForm) {
		if (!form.valid) return;
		const {email, password} = form.value;
		this.isLoading          = true;
		this.auth.signIn(email, password).subscribe({
			next: async value => {
				this.isLoading   = false;
				const isRedirect = !(this.router.url.includes("sign-in") || this.router.url.includes("register"));
				this.close();
				if (isRedirect) {
					await this.modals.alert("<h4>Signed in successfully.</h4>", {
						bodyAsRawHtml: true,
					});
					await redirectTo(this.router, this.router.url);
				} else {
					await this.router.navigateByUrl("/recipes");
					await this.modals.alert("<h4>Signed in successfully.</h4>", {
						bodyAsRawHtml: true,
					});
				}
			},
			error: err => {
				this.isLoading = false;
				this.close();
				console.log(err);
				this.modals.alert(err[ERROR_MESSAGE], {
					title: "Failed to sign in",
					okButtonClasses: ["btn", "btn-danger"]
				});
			}
		});
		form.reset();
	}
}
