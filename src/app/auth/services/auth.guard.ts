import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {PromiseOrObservableOrT} from "../../../libs/types";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor (private auth: AuthService, private router: Router) {
	}

	canActivate (
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): PromiseOrObservableOrT<boolean | UrlTree> {
		if (this.auth.isLoggedIn) {
			return true;
		} else {
			return this.router.createUrlTree(["/sign-in"]);
		}
	}
}
