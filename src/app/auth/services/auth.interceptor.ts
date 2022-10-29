import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor (private auth: AuthService) {
	}

	intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const user = this.auth.user.value;
		if (user != null && user.token != null) {
			request = request.clone({
				params: request.params.set("auth", user.token)
			});
		}
		return next.handle(request);
	}
}
