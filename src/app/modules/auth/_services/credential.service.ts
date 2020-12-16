import { Injectable } from "@angular/core";
import { environment } from "@env/environment";

const USER_NAME_KEY = "userName";
const USER_ID_KEY = "userId";

@Injectable({
  providedIn: "root"
})
export class Credential {
  public rsAccessTokenKey: string = null;
  public userName: any = null;
  public userId: string = null;
  public cacheTime = 60 * 60 * 24 * 14; // TTL in seconds for 2 weeks

  cache = localStorage;

  constructor() // public cache: CacheService
  {}

  public getRsAccessToken() {
    if (this.rsAccessTokenKey) {
      return this.rsAccessTokenKey;
    }

    const token = this.cache.getItem(environment.authAccessToken.keyName);

    this.rsAccessTokenKey = token;

    return token;
  }

  public setRsAccessToken(token: string) {
    this.rsAccessTokenKey = token;

    if (token) {
      this.cache.setItem(environment.authAccessToken.keyName, token);
    } else {
      this.cache.removeItem(environment.authAccessToken.keyName);
    }
  }

  public getUsername() {
    if (this.userName) {
      return this.userName;
    }

    return (this.userName = this.cache.getItem(USER_NAME_KEY));
  }

  public setUserName(userName: string) {
    this.userName = userName;

    if (userName) {
      this.cache.setItem(USER_NAME_KEY, userName);
    } else {
      this.cache.removeItem(USER_NAME_KEY);
    }
  }

  public getUserId() {
    if (this.userId) {
      return this.userId;
    }

    return (this.userId = this.cache.getItem(USER_ID_KEY));
  }

  public setUserId(userId: string) {
    this.userId = userId;

    if (userId) {
      this.cache.setItem(USER_ID_KEY, userId);
    } else {
      this.cache.removeItem(USER_ID_KEY);
    }
  }
}
