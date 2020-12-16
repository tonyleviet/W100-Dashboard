// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, NavigationEnd, CanActivateChild, CanLoad, Route, UrlSegment } from '@angular/router';
// RxJS
import { Observable, combineLatest, of } from 'rxjs';
import { tap, map, switchMap, catchError, filter, withLatestFrom } from 'rxjs/operators';
// NGRX
import { select, Store } from '@ngrx/store';
// Auth reducers and selectors
import { AppState} from '@core-ui/reducers/';

import { isLoggedIn } from '../_selectors/auth.selectors';
import { selectUserPermissionByUrl } from '@app/modules/permission-management/_selectors/permission.selector';
import { PermissionMenuModel } from '@app/modules/permission-management/_models/permission.model';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
    return this.store.pipe(
      select(isLoggedIn),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        }
      })
    );
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
    if (state.url.indexOf('/dashboard') === 0) return of(true);
    if (state.url.indexOf('/error') === 0) return of(true);

    return this.store.pipe(
      withLatestFrom(this.store.pipe(select(selectUserPermissionByUrl(state.url)))),
      filter(([action, response]) => response.isLoad),
      switchMap((response: any) => {
        const userPermissionByUrl = response[1];
        if (userPermissionByUrl.isLoad) {
          const pagePermission: PermissionMenuModel = userPermissionByUrl.permission;
          if (pagePermission && (pagePermission.Access || pagePermission.ChildrenAccess)) {
            return of(true);
          } else {
            this.router.navigate(['/error/403'], { queryParams: { returnUrl: state.url } });
            return of(false);
          }
        }
      }),
      catchError((error, caught) => {
        console.log("AuthGuard -> error", error)
        this.router.navigate(['/error/403'], { queryParams: { returnUrl: state.url } });
        return of(false);
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>  {
    return new Observable<boolean>((obs) => {
      obs.next(true);
      obs.complete();
    });
  }
}
