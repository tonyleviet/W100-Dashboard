import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpParams,
  HttpHandler
} from "@angular/common/http";

import { Observable, of } from "rxjs";
import * as moment from 'moment';
// Lodash
import { isEmpty, chain, set, map, isObject, cloneDeep } from "lodash";

import { Credential } from "@module/auth/_services/credential.service";

@Injectable({
  providedIn: "root"
})
export class BaseRSHttpClient extends HttpClient {
  protected api: string;
  protected withoutAccessTokenKey = false;

  protected adminConfig = AdminConfig;

  constructor(handler: HttpHandler, private credential: Credential) {
    super(handler);
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
    try {
      let override = {};
      if (!options) {
        options = {};
      }
      url = this.api + url;

      // token
      let headers: HttpHeaders | undefined = undefined;
      if (options.headers instanceof HttpHeaders) {
        headers = options.headers;
      } else {
        headers = new HttpHeaders(options.headers);
        headers = headers.set("Content-Type", "application/json; charset=utf-8");
      }
      if (this.credential.rsAccessTokenKey && !this.withoutAccessTokenKey) {
        headers = headers.set("X-MCMAccessToken", this.credential.rsAccessTokenKey);
        headers = headers.set("Authorization", `Bearer ${this.credential.rsAccessTokenKey}`);
      }

      options.headers = headers;

      if (options.body instanceof Object && !(options.body instanceof FormData)) {
        let body: any = cloneDeep(options.body);


        this.browseTheObject(body);

        options.body = body;
      }
      let req = super.request(first as string, url, options as any);
      return req;
    } catch (error) {
      console.error('line 70 - error', error);
    }
  }

  private browseTheObject(obj: object): void {
    map(obj, (value, key) => {
      if (moment.isMoment(value)) {
        obj[key] = this.convertDateTime(value);
      }
      if (isObject(value)) {
        this.browseTheObject(value);
      }
    })
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
    return (isEmpty(query)) ? ''
      : '?' + chain(query).map((value: string | number, key: string) => `${key}=${value}`).join('&').value();
  }
}

export type HttpObserve = "body" | "events" | "response";

/** Module **/
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminConfig } from '@app/core/configs/admin.config';

@NgModule({
  exports: []
})
export class BaseGatewayModules { }
