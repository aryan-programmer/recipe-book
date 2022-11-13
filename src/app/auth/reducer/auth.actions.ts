import {createAction, props} from '@ngrx/store';
import {Optional} from "../../../libs/types";
import {User} from "../model/user.model";

export const NAME              = "AUTHENTICATION";
export const RESTORE_USER      = NAME + "::RESTORE_USER";
export const LOGIN_START       = NAME + "::LOGIN_START";
export const REGISTER_START    = NAME + "::REGISTER_START";
export const AUTH_SUCCESS      = NAME + "::AUTH_SUCCESS";
export const AUTH_FAILED       = NAME + "::AUTH_FAILED";
export const ALREADY_SIGNED_IN = NAME + "::ALREADY_SIGNED_IN";
export const LOGOUT            = NAME + "::LOGOUT";

export const RestoreUser     = createAction(RESTORE_USER);
export const LoginStart      = createAction(LOGIN_START, props<{ email: string, password: string }>());
export const RegisterStart   = createAction(REGISTER_START, props<{ email: string, password: string }>());
export const AuthSuccess     = createAction(AUTH_SUCCESS, props<{ user: User, message: string, restored?: boolean }>());
export const AuthFailed      = createAction(AUTH_FAILED, props<{ title: string, errorMessage: string }>());
export const AlreadySignedIn = createAction(ALREADY_SIGNED_IN, props<{ message: string }>());
export const Logout          = createAction(LOGOUT, (message: string = "Logged out successfully") => ({message: message}));

export type State = {
	user: Optional<User>,
	isLoading: boolean,
};
