import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpParams,
  HttpHandler,
} from "@angular/common/http";

import { environment } from "@env/environment";
import { BaseRSHttpClient } from "../base/base.rs-httpclient";

export interface IBitlyResponse {
  created_at: Date;
  id: string;
  link: string;
  custom_bitlinks: any[];
  long_url: string;
  archived: boolean;
  tags: any[];
  deeplinks: any[];
  references: {
    group: string;
  };
}

@Injectable({
  providedIn: "root",
})
export class BitlyHttpClient extends BaseRSHttpClient {
  protected api = environment.bitly.url;
  protected withoutAccessTokenKey = true;
}
