import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { BaseRSHttpClient } from "../base/base.rs-httpclient";

@Injectable({
  providedIn: "root",
})
export class DistributionHttpClient extends BaseRSHttpClient {
  protected api = environment.distributionUrl;
}
