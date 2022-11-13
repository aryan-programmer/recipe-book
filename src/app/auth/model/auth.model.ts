import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {ERROR_MESSAGE} from "../../common/utils/consts";

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

export function getAuthErrorMessage (err: HttpErrorResponse) {
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
	return errMsg;
}

export function authErrorCatcher (err: HttpErrorResponse) {
	err[ERROR_MESSAGE] = getAuthErrorMessage(err);
	return throwError(() => err);
}
