import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { HttpUtilsService } from "@core-ui/_base/crud";
import { environment } from "@env/environment";
import { SecurityHttpClient } from "@app/modules-services/security/sec-api.service";
import { Credential } from "./credential.service";
import { RsAccessTokenResponseType } from "./types";
import { UserModel } from "@app/modules/user-management/_models/user.model";
import { UserAuthModel } from "../_models/user-auth.model";
import { UnitedHttpClient } from "@app/modules-services";

@Injectable()
export class AuthService {
  public scApiToken: string = null;

  cache = localStorage;

  constructor(
    private scApi: SecurityHttpClient,
    private unitedApi: UnitedHttpClient,
    private credential: Credential
  ) {}

  async getRsAccessToken(): Promise<RsAccessTokenResponseType> {
    const rsAccessToken = this.credential.getRsAccessToken();

    if (rsAccessToken) {
      const accessTokenResponse: RsAccessTokenResponseType = {
        AccessToken: rsAccessToken,
      };
      this.credential.rsAccessTokenKey = rsAccessToken;
      return new Promise((res) => res(accessTokenResponse));
    }

    const user: { Username: string; Password: string } = {
      Username: environment.authAccessToken.username,
      Password: environment.authAccessToken.password,
    };

    return this.unitedApi
      .post<RsAccessTokenResponseType>(
        `/tokens/${environment.authAccessToken.consumerKey}`,
        user
      )
      .pipe(
        tap((user) => {
          this.credential.setRsAccessToken(user.AccessToken);
          return user;
        })
      )
      .toPromise();
  }

  // Authentication/Authorization
  login(username: string, password: string): Observable<UserAuthModel> {
    const body = {
      Username: username,
      Password: password,
      ConsumerId: environment.authAccessToken.consumerKey,
    };
    return this.scApi.post<UserAuthModel>(`/login/0/post`, body);
  }

  getUserByToken(username: string): Observable<UserModel> {
    return this.scApi.get<UserModel>(`/users?un=${username}`).pipe(map((user) => {
      if (!user.UserProfile) {
        return user;
      }

      return user.UserProfile;
    }));
  }

  /*
   * Submit forgot password request
   *
   * @param {string} email
   * @returns {Observable<any>}
   */
  public requestPassword(
    email: string,
    bannerId: number = 13
  ): Observable<any> {
    return this.scApi.post<any>(
      `/ForgotPassword?username=${email}&bannerid=${bannerId}`,
      null
    );
  }

  /*
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: any) {
    return (error: any): Observable<any> => {
      // TODO: send the error to remote logging infrastructure
      console.error("auth.service", error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
}
