import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from "@ngrx/store";
import {catchError, from, of, switchMap, take, tap} from "rxjs";
import {map} from 'rxjs/operators';
import {EmptyAction} from "../../../libs/empty.actions";
import {ModalsService} from "../../../libs/modals/modals.service";
import {AUTH_SIGN_IN_URL, AUTH_SIGN_UP_URL, USER_DATA_KEY} from "../../common/utils/consts";
import * as Recipes from "../../recipes/reducers/recipes.actions";
import {AppState} from "../../reducers/app.store";
import {getAuthErrorMessage, SignInResponse, SignUpResponse} from "../model/auth.model";
import {getToken, User} from "../model/user.model";
import {AuthService} from "../services/auth.service";
import * as Auth from "./auth.actions";

@Injectable()
export class AuthEffects {
	authLogin$ = createEffect(() => this.actions$.pipe(
		ofType(Auth.LoginStart),
		switchMap(({email, password}) => this.http
			.post<SignInResponse>(
				AUTH_SIGN_IN_URL,
				{email, password, returnSecureToken: true}
			)
			.pipe(
				map(this.handleAuth("Signed in successfully.")),
				catchError(err => {
					return of(Auth.AuthFailed({
						errorMessage: getAuthErrorMessage(err),
						title: "Failed to sign in."
					}));
				})
			)),
	));

	authRegister$ = createEffect(() => this.actions$.pipe(
		ofType(Auth.RegisterStart),
		switchMap(({email, password}) => this.http
			.post<SignUpResponse>(
				AUTH_SIGN_UP_URL,
				{email, password, returnSecureToken: true}
			)
			.pipe(
				map(this.handleAuth("Registered successfully.")),
				catchError(err => {
					return of(Auth.AuthFailed({
						errorMessage: getAuthErrorMessage(err),
						title: "Failed to register."
					}));
				})
			)
		),
	));

	authRedirect$ = createEffect(() => this.actions$.pipe(
		ofType(Auth.AuthSuccess),
		tap(async({message, restored}) => {
			if (!restored) {
				await this.router.navigateByUrl("/recipes");
				await this.modals.alert(`<h4>${message}</h4>`, {
					bodyAsRawHtml: true,
				});
			}
		}),
		map(value => {
			return Recipes.FetchRecipes();
		})
	));

	authFailure$ = createEffect(() => this.actions$.pipe(
		ofType(Auth.AuthFailed),
		tap(async ({errorMessage, title}) => {
			await this.modals.alert(errorMessage, {
				title,
				okButtonClasses: ["btn", "btn-danger"]
			});
		})
	), {dispatch: false});

	authLogout$ = createEffect(() => this.actions$.pipe(
		ofType(Auth.Logout),
		tap(({message}) => {
			this.store.dispatch(Recipes.SetRecipes({recipes: []}));
			this.actions$.pipe(
				ofType(Recipes.SetRecipes),
				take(1)
			).subscribe(async () => {
				localStorage.removeItem(USER_DATA_KEY);
				await this.router.navigateByUrl("/auth/sign-in");
				await this.modals.alert(message)
			})
		}),
	), {dispatch: false});

	restoreUser$ = createEffect(() => this.actions$.pipe(
		ofType(Auth.RestoreUser),
		map(() => {
			const ud = localStorage.getItem(USER_DATA_KEY);
			if (ud == null) {
				return EmptyAction();
			}
			const user = JSON.parse(ud) as User;
			if (getToken(user) == null) {
				return Auth.Logout();
			}
			const expiryMs = user.tokenExpiryMs - new Date().getTime();
			this.authService.setLogoutTimer(expiryMs);
			return Auth.AuthSuccess({user, message: "Restored user successfully", restored: true});
		})
	));

	handleAuth = (message: string) => (value: SignInResponse | SignUpResponse) => {
		let expiryMs      = +value.expiresIn * 1000;
		let tokenExpiryMs = new Date().getTime() + expiryMs;
		const user: User  = {
			email: value.email,
			id: value.localId,
			token: value.idToken,
			tokenExpiryMs
		};
		this.authService.setLogoutTimer(expiryMs);
		localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
		return Auth.AuthSuccess({user, message});
	}

	constructor (
		private actions$: Actions,
		private http: HttpClient,
		private router: Router,
		private modals: ModalsService,
		private authService: AuthService,
		private store: Store<AppState>
	) {
	}
}

