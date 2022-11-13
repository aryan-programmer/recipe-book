import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {Optional} from "../../../libs/types";
import {AppState} from "../../reducers/app.store";
import * as Auth from "../reducer";

@Injectable()
export class AuthService {
	autoLogoutTimer: Optional<NodeJS.Timeout>;

	constructor (private store: Store<AppState>) {
	}

	setLogoutTimer (expiryMs: number) {
		this.autoLogoutTimer = setTimeout(() => {
			this.store.dispatch(Auth.Logout("Login time expired. Please login in again."));
			this.resetLogoutTimer();
		}, expiryMs);
	}

	resetLogoutTimer () {
		if (this.autoLogoutTimer != null) {
			clearTimeout(this.autoLogoutTimer);
			this.autoLogoutTimer = null;
		}
	}
}
