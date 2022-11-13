import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Store} from "@ngrx/store";
import {map, take} from "rxjs";
import {PromiseOrObservableOrT} from "../../../libs/types";
import {AppState} from "../../reducers/app.store";
import * as Auth from "../reducer";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor (private router: Router, private store: Store<AppState>) {
	}

	canActivate (
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): PromiseOrObservableOrT<boolean | UrlTree> {
		return this.store.select(Auth.NAME).pipe(
			take(1),
			map(value => {
				if (value.user != null) {
					return true;
				} else {
					return this.router.createUrlTree(["/auth/sign-in"]);
				}
			})
		);
	}
}
