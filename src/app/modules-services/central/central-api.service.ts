import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';

import { environment } from '@env/environment'
import { BaseRSHttpClient } from '../base/base.rs-httpclient';

@Injectable({
  providedIn: 'root'
})
export class CentralHttpClient extends BaseRSHttpClient {
  protected api = environment.centralUrl;
  protected withoutAccessTokenKey = true;
}
