import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http'
import { AuthService } from './auth.service';
import { exhaustMap, map } from "rxjs/operators";
import { take } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import * as fromApp  from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        // return this.authService.user.pipe(take(1), exhaustMap(user => {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                console.log('interceptor - user: ' + authState.user)
                return authState.user;
            }),
            exhaustMap(user => {
                if(!user) {
                    return next.handle(request);
                } 
                const modifiedReq = request.clone({params: new HttpParams().set('auth', user.token)});
                return next.handle(modifiedReq);
        }));
    }
}