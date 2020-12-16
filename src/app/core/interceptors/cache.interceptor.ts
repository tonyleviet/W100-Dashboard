import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable, of, from, } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { CacheService } from "ionic-cache";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  /**
    rCache: default | fresh
      default: if cache get form cache
      fresh: get newest and cache
      clear: get and clear cache
  **/
  constructor(public cache: CacheService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cache: any = req.params.get('rCache');
    if (!cache) {
      return next.handle(req);
    }
    let key = req.params.get('rCacheKey') || req.urlWithParams || req.url;
    let group = req.params.get('rCacheGroupKey') || null;

    let params = req.params.delete('rCache');
    params = params.delete('rCacheKey');
    params = params.delete('rCacheGroupKey');
    req = req.clone({params: params});
    // let cacheDelayType = 'all'
    // return this.cacheService.loadFromDelayedObservable(key, next.handle(req), null, null, cacheDelayType);
    // return next.handle(req);
    // return this.cacheService.loadFromObservable(key, next.handle(req));
    // console.log(req);
    let o: Observable<HttpEvent<any>>;

    if(cache == 'fresh' || cache == 'clear'){
      o= next.handle(req);
    }
    else{
      o = from(this.cache.getItem(key)).pipe(
        catchError((error)=>{
          return of(null);
        }),
        switchMap((d: any) => {
          if (d) {
            return of(new HttpResponse<any>(d))
          }
          return next.handle(req);
        })
      );
    }
    o = o.pipe(
      tap(event => {
        if (!cache) {
          return;
        }
        if (event instanceof HttpResponse) {
          this.cache.saveItem(key, event, group);
        }
      })
    );

    return o;
  }



}
