import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpParams,
  HttpHandler,
} from "@angular/common/http";
import * as moment from "moment";
import { Observable } from "rxjs";

// Lodash
import { isEmpty, chain, map, isObject, cloneDeep } from "lodash";

import { environment } from "@env/environment";
import { AdminConfig } from "@app/core";
import { HttpObserve } from "../base/base.rs-httpclient";
import { RsAccessTokenResponseType } from '@app/modules/auth/_services/types';
import { tap } from 'rxjs/operators';

/**
 * This is legacy code.
 * Need another access token key for United company
 */
@Injectable({
  providedIn: "root",
})
export class UnitedTempHttpClient extends HttpClient {
  protected apiTemp = environment.unitedTempUrl;
  protected adminConfig = AdminConfig;

  private unitedAccessTokenKey: string = null;

  constructor(handler: HttpHandler, private http: HttpClient) {
    super(handler);

    this.getUnitedAccessToken();
  }

  request(
    first: string | HttpRequest<any>,
    url?: string,
    options: {
      body?: any;
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe?: HttpObserve;
      params?: HttpParams | { [param: string]: string | string[] };
      reportProgress?: boolean;
      responseType?: "arraybuffer" | "blob" | "json" | "text";
      withCredentials?: boolean;
    } = {}
  ): Observable<any> {
    let override = {};
    if (!options) {
      options = {};
    }
    url = this.apiTemp + url;

    // token
    let headers: HttpHeaders | undefined = undefined;
    if (options.headers instanceof HttpHeaders) {
      headers = options.headers;
    } else {
      headers = new HttpHeaders(options.headers);
      headers = headers.set("Content-Type", "application/json; charset=utf-8");
    }
    if (this.unitedAccessTokenKey) {
      headers = headers.set("X-MCMAccessToken", this.unitedAccessTokenKey);
      headers = headers.set(
        "Authorization",
        `Bearer ${this.unitedAccessTokenKey}`
      );
    } else {
      console.warn('United access token invalid, please contact system admin for support.');
    }

    options.headers = headers;

    if (options.body instanceof Object && !(options.body instanceof FormData)) {
      let body: any = cloneDeep(options.body);

      this.browseTheObject(body);
      options.body = body;
    }
    let req = super.request(first as string, url, options as any);
    return req;
  }

  async fetchUnitedAccessToken(): Promise<RsAccessTokenResponseType> {
    const unitedAccessToken = this.getUnitedAccessToken();

    if (unitedAccessToken) {
      const accessTokenResponse: RsAccessTokenResponseType = {
        AccessToken: unitedAccessToken
      };
      this.unitedAccessTokenKey = unitedAccessToken;
      return new Promise(res => res(accessTokenResponse));
    }

    const user: { Username: string; Password: string } = {
      Username: environment.unitedAccessToken.username,
      Password: environment.unitedAccessToken.password
    };
    
    return this.http.post<RsAccessTokenResponseType>(`${this.apiTemp}/tokens/${environment.unitedAccessToken.consumerKey}`, user)
      .pipe(
        tap(user => {
          this.setUnitedAccessToken(user.AccessToken);
          return user;
        })
      )
      .toPromise();
  }

  private setUnitedAccessToken(token: string) {
    this.unitedAccessTokenKey = token;

    if (token) {
      localStorage.setItem(environment.unitedAccessToken.keyName, token);
    } else {
      localStorage.removeItem(environment.unitedAccessToken.keyName);
    }
  }

  private getUnitedAccessToken() {
    if (this.unitedAccessTokenKey) {
      return this.unitedAccessTokenKey;
    }

    const token = localStorage.getItem(environment.unitedAccessToken.keyName);

    this.unitedAccessTokenKey = token;

    return token;
  }

  private browseTheObject(obj: object): void {
    map(obj, (value, key) => {
      if (moment.isDate(value)) {
        obj[key] = this.convertDateTime(value);
      }
      if (isObject(value)) {
        this.browseTheObject(value);
      }
    });
  }

  private convertDateTime(value: Date): string {
    return moment(value).format(this.adminConfig.format.apiDateTime);
  }

  /**
   * Convert Object to params string.
   * Use lodash function set.
   * Ex: set(query, 'keyword', 'abcd')
   *
   * @param query: Object { keyword: abcd, pageSize: 0 }
   * @returns string: ?keyword=abcd&pageSize=0
   */
  convertObjectToParamString(query: {}): string {
    return isEmpty(query)
      ? ""
      : "?" +
          chain(query)
            .map((value: string | number, key: string) => `${key}=${value}`)
            .join("&")
            .value();
  }
}
