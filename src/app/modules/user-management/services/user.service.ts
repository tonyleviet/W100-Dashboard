import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { QueryParamsModel } from "@core-ui/_base/crud";
import {
  UserListResultModel,
  UserCreateModel,
  UserModel,
  ChangePasswordModel,
  IAddUserStoreBody,
  IStoreAssignedUser,
  IStore,
} from "../_models/user.model";
import { AddressModel } from "../_models/address.model";
import { map, tap } from "rxjs/operators";
import { environment } from "@env/environment";
import { SecurityHttpClient, StoreHttpClient } from "@app/modules-services";
import { RelationShopHttpClient } from "@app/modules-services/relationshop/relationshop-api.service";

@Injectable()
export class UserService {
  userUrl = "/users";
  storeUrl = "store"; // TODO: legacy

  constructor(
    private rsApi: RelationShopHttpClient,
    private secApi: SecurityHttpClient,
    private storeApi: StoreHttpClient
  ) {}

  createUser(user: UserCreateModel): Observable<any> {
    return this.secApi.post<any>(`${this.userUrl}/admin`, user);
  }

  updateUser(user: UserModel): Observable<any> {
    return this.rsApi.put<any>(`${this.userUrl}/${user.UserId}`, user);
  }

  getUserByEmail(email: string): Observable<UserModel> {
    return this.rsApi.get<UserModel>(`${this.userUrl}?un=${email}`).pipe(
      map((user) => {
        // Cheating missing UserID
        if (user) {
          if (!user.UserId) {
            user.UserId = user.UserID;
          }

          if (!user.Email) {
            user.Email = user.UserName;
          }
        }

        return user;
      })
    );
  }

  getUsers(
    queryParams: QueryParamsModel,
    sortStatus: string = "all"
  ): Observable<UserListResultModel> {
    const paramString = queryParams.getParamString("start", "max");
    let paramStatusString = "&role=,Access%20Admin,";
    switch (sortStatus) {
      case "active":
        paramStatusString += "&isapproved=true";
        break;
      case "inactive":
        paramStatusString += "&isapproved=false";
        break;
      case "locked":
        paramStatusString += "&islockedout=true";
        break;
      default:
        break;
    }
    return this.rsApi.get<UserListResultModel>(
      `${this.userUrl}?${paramString}${paramStatusString}`
    ).pipe(
      map((rs) => {
        // Cheating missing UserID, UserName
        if (rs && rs.Users) {
          rs.Users = rs.Users.map((user) => {
            if (!user.UserId) {
              user.UserId = user.UserID;
            }

            if (!user.Email) {
              user.Email = user.UserName;
            }

            return user;
          });
        }

        return rs;
      })
    );
  }

  searchUsers(keyword: string): Observable<UserListResultModel> {
    return this.rsApi.get<UserListResultModel>(
      `${this.userUrl}?field=all&value=${keyword}&start=0&max=10`
    );
  }

  getTotalAllUser(key: string): Observable<number> {
    return this.rsApi
      .get<UserListResultModel>(
        `${this.userUrl}?field=all&value=${key}&role=,Access%20Admin,`
      )
      .pipe(map((res: UserListResultModel) => res.TotalResult));
  }

  getTotalActiveUser(key: string): Observable<number> {
    return this.rsApi
      .get<UserListResultModel>(
        `${this.userUrl}?field=all&value=${key}&isapproved=true&role=,Access%20Admin,`
      )
      .pipe(map((res: UserListResultModel) => res.TotalResult));
  }

  getTotalInActiveUser(key: string): Observable<number> {
    return this.rsApi
      .get<UserListResultModel>(
        `${this.userUrl}?field=all&value=${key}&isapproved=false&role=,Access%20Admin,`
      )
      .pipe(map((res: UserListResultModel) => res.TotalResult));
  }

  getTotalLockedUser(key: string): Observable<number> {
    return this.rsApi
      .get<UserListResultModel>(
        `${this.userUrl}?field=all&value=${key}&islockedout=true&role=,Access%20Admin,`
      )
      .pipe(map((res: UserListResultModel) => res.TotalResult));
  }

  changePasswordUser(model: ChangePasswordModel): Observable<boolean> {
    return this.rsApi.post<boolean>(
      `${this.userUrl}/set-password?username=${model.UserName}`,
      `"${model.NewPassword}"`
    );
  }

  resetPasswordUser(userName: string, bannerId: number = 13): Observable<any> {
    return this.rsApi.post<any>(
      `/ForgotPassword?username=${userName}&bannerid=${bannerId}`,
      {}
    );
  }

  /*
   * Address
   */
  getUserAddress(userId: string): Observable<AddressModel[]> {
    return this.rsApi.get<AddressModel[]>(
      `${this.userUrl}/contacts/user?userId=${userId}`
    );
  }

  addUserAddress(item: AddressModel): Observable<any> {
    return this.rsApi.post<any>(`${this.userUrl}/contact/add`, item);
  }

  updateUserAddress(item: AddressModel): Observable<any> {
    return this.rsApi.post<any>(`${this.userUrl}/contact/update`, item);
  }

  deleteUserAddress(contactId: number): Observable<any> {
    return this.rsApi.get<any>(
      `${this.userUrl}/contact/delete?contactId=${contactId}`
    );
  }

  fetchAllStores(): Observable<IStore[]> {
    const storesStr = localStorage.getItem(environment.allStoresKey);

    if (storesStr) {
      const stores = JSON.parse(storesStr);
      const activeStores = ((Array.isArray(stores) && stores) || []).filter(
        (store) => store.IsActive
      );
      return of(activeStores);
    }

    const query: any = {
      keyword: "",
      pageSize: 200,
      pageIndex: 1,
      sort: "CreatedDate DESC",
      filters: [
        {
          name: "companyId",
          values: [environment.defaultCompanyId],
        },
        {
          name: "services",
          values: [],
        },
      ],
    };

    return this.storeApi.post<IStore[]>(`${this.storeUrl}/search`, query).pipe(
      tap((data: any) => {
        if (data && data.Stores) {
          localStorage.setItem(
            environment.allStoresKey,
            JSON.stringify(data.Stores)
          );
        }
      }),
      map((data) => {
        if (data && data.Stores) {
          const stores = JSON.parse(storesStr);
          // return data.Stores.filter(store => store.IsActive);
          const dataStores = data.Stores;
          return ((Array.isArray(dataStores) && dataStores) || []).filter(
            (store) => store.IsActive
          );
        }

        return [];
      })
    );
  }

  fetchStoreDetails(storeCode: number) {
    return this.storeApi.get<IStore>(`${this.storeUrl}/by-id/${storeCode}`);
  }

  fetchStoresAssignedToUser(userId: string): Observable<IStoreAssignedUser[]> {
    return this.secApi.get<IStoreAssignedUser[]>(
      `${this.userUrl}/${userId}/allStore`
    );
  }

  addUserStore(body: IAddUserStoreBody): Observable<IStoreAssignedUser> {
    return this.secApi.post<IStoreAssignedUser>(
      `${this.userUrl}/${body.userId}/stores`,
      body
    );
  }

  updateUserStore(body: IAddUserStoreBody): Observable<IStoreAssignedUser> {
    return this.secApi.put<IStoreAssignedUser>(
      `${this.userUrl}/${body.userId}/stores/${body.storeId}`,
      body
    );
  }

  removeUserStore(userId: string, storeId: number) {
    return this.secApi.delete(`${this.userUrl}/${userId}/stores/${storeId}`);
  }
}
