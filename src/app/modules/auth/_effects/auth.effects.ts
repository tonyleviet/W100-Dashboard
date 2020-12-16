// Angular
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// RxJS
import { filter, mergeMap, tap, withLatestFrom, catchError } from 'rxjs/operators';
import { defer, Observable, of } from 'rxjs';
// NGRX
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
// Auth actions
import { AuthActionTypes, Login, Logout, Register, UserLoaded, UserRequested } from '../_actions/auth.actions';
import { AuthService } from '../_services/index';
import { AppState } from '@core-ui/reducers';
import { environment } from '../../../../environments/environment';
import { isUserLoaded } from '../_selectors/auth.selectors';
import { Credential } from '@module/auth/_services/credential.service';
import * as PermissionActions from '@app/modules/permission-management/_actions/permission.action';

@Injectable()
export class AuthEffects {
    @Effect({dispatch: false})
    login$ = this.actions$.pipe(
        ofType<Login>(AuthActionTypes.Login),
        tap(action => {
            localStorage.setItem(environment.authAccessToken.keyName, action.payload.authToken);
            this.store.dispatch(new UserRequested({ userName: action.payload.userName }));
        }),
    );

    @Effect({dispatch: false})
    logout$ = this.actions$.pipe(
        ofType<Logout>(AuthActionTypes.Logout),
        tap(() => {
            localStorage.removeItem(environment.authAccessToken.keyName);
            localStorage.removeItem(environment.unitedAccessToken.keyName);
            localStorage.removeItem(environment.allStoresKey);
            localStorage.removeItem(environment.allCustomServices);
            // this.router.navigate(['/auth/login'], {queryParams: {returnUrl: this.returnUrl}});
            this.router.navigate(['/auth/login']);
        })
    );

    @Effect({dispatch: false})
    register$ = this.actions$.pipe(
        ofType<Register>(AuthActionTypes.Register),
        tap(action => {
            localStorage.setItem(environment.authAccessToken.keyName, action.payload.authToken);
        })
    );

    @Effect({dispatch: false})
    loadUser$ = this.actions$
    .pipe(
        ofType<UserRequested>(AuthActionTypes.UserRequested),
        withLatestFrom(this.store.pipe(select(isUserLoaded))),
        filter(([action, _isUserLoaded]) => !_isUserLoaded),
        mergeMap(([action, _isUserLoaded]) => this.auth.getUserByToken(action.payload.userName)),
        tap(_user => {
            if (_user) {
                this.credential.setUserId(_user.UserId);
                this.store.dispatch(new UserLoaded({ user: _user }));
                this.store.dispatch(new PermissionActions.LoadPermissionMenuAction({
                  companyId: environment.defaultCompanyId,
                  userId: _user.UserId
                }));
            } else {
                this.store.dispatch(new Logout());
            }
        }),
        catchError((error, caught) => {
            this.store.dispatch(new Logout());
            return caught;
        })
      );

    @Effect()
    init$: Observable<Action> = defer(() => {
        const userToken = this.credential.getRsAccessToken();
        const userName = this.credential.getUsername();
        const userId = this.credential.getUserId();

        let observableResult = of({type: 'NO_ACTION'});
        if (userToken) {
            observableResult = of(new Login({ userName, authToken: userToken }));
        }
        return observableResult;
    });

    private returnUrl: string;

    constructor(private actions$: Actions,
        private router: Router,
        private auth: AuthService,
        private store: Store<AppState>,
        private credential: Credential) {

		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.returnUrl = event.url;
			}
		});
	}
}
