import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {exhaustMap, Observable, take} from 'rxjs';
import {USER_ID_PLACEHOLDER} from "../../common/utils/consts";
import {AppState} from "../../reducers/app.store";
import {getToken} from "../model/user.model";
import * as Auth from "../reducer";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor (private store: Store<AppState>) {
	}

	intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return this.store.select(Auth.NAME).pipe(
			take(1),
			exhaustMap(value => {
				const user = value.user;
				let token: string | null;
				if (user != null && (token = getToken(user)) != null) {
					request = request.clone({
						params: request.params.set("auth", token),
						url: request.url.replace(USER_ID_PLACEHOLDER, user.id),
					});
				}
				return next.handle(request);
			})
		);
	}
}
