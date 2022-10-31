import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {Optional} from "../../../libs/types";
import {API_KEY, ERROR_MESSAGE} from "../../common/utils/consts";
import {User} from "./user.model";

const AUTH_SIGN_UP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY;
const AUTH_SIGN_IN_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + API_KEY;
const USER_DATA_KEY    = "userData";

export type SignUpResponse = {
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
};

export type SignInResponse = SignUpResponse & {
	registered: boolean;
};

function errorCatcher (err: HttpErrorResponse) {
	let errMsg = "An unknown error occurred";
	switch (err?.error?.error?.message) {
		case "EMAIL_EXISTS":
			errMsg = "That email has already been used to sign up a user.";
			break;
		case "EMAIL_NOT_FOUND":
			errMsg = "A user with that email doesn't exist.";
			break;
		case "INVALID_PASSWORD":
			errMsg = "Invalid password";
			break;
	}
	err[ERROR_MESSAGE] = errMsg;
	return throwError(() => err);
}

@Injectable()
export class AuthService {
	user = new BehaviorSubject<Optional<User>>(null);
	autoLogoutTimer: Optional<NodeJS.Timeout>;

	constructor (private http: HttpClient, private router: Router) {
		this.saveUser = this.saveUser.bind(this);
	}

	private saveUser (value: SignUpResponse | SignInResponse) {
		let expiryMs        = +value.expiresIn * 1000;
		let tokenExpiryDate = new Date(new Date().getTime() + expiryMs);
		const user          = new User(value.email, value.localId, value.idToken, tokenExpiryDate);
		this.user.next(user);
		localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
		this.autoLogout(expiryMs);
	}

	restoreUser () {
		const ud = localStorage.getItem(USER_DATA_KEY);
		if (ud == null) {
			return;
		}
		const userData = JSON.parse(ud);
		const user     = User.fromObject(userData);
		if (user.token == null) {
			this.signOut();
		}
		const expiryMs = user.tokenExpiryDate.getTime() - new Date().getTime();
		this.user.next(user);
		this.autoLogout(expiryMs);
	}

	register (email: string, password: string) {
		return this.http
			.post<SignUpResponse>(
				AUTH_SIGN_UP_URL,
				{
					email,
					password,
					returnSecureToken: true
				}
			)
			.pipe(
				catchError(errorCatcher),
				tap(this.saveUser)
			);
	}

	get isLoggedIn (): boolean {
		return this.user.value != null;
	}

	signIn (email: string, password: string) {
		return this.http
			.post<SignInResponse>(
				AUTH_SIGN_IN_URL,
				{
					email,
					password,
					returnSecureToken: true
				}
			)
			.pipe(
				catchError(errorCatcher),
				tap(this.saveUser)
			);
	}

	signOut () {
		this.user.next(null);
		localStorage.removeItem(USER_DATA_KEY);
		if (this.autoLogoutTimer != null) {
			clearTimeout(this.autoLogoutTimer);
			this.autoLogoutTimer = null;
		}
		this.router.navigateByUrl("/sign-in");
	}

	autoLogout (expiryMs: number) {
		console.log(expiryMs);
		this.autoLogoutTimer = setTimeout(() => {
			this.signOut();
		}, expiryMs);
	}
}
