import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { SecurityHttpClient } from "@app/modules-services/security/sec-api.service";
import { RoleModel } from "../_models/role.model";
import { UserListResultModel } from "@app/modules/user-management/_models/user.model";

@Injectable()
export class RoleService {
  constructor(public secApi: SecurityHttpClient) {}

  getRoles(): Observable<RoleModel[]> {
    return this.secApi.get<RoleModel[]>(`/Roles/0/GetAllRoles`);
  }

  createRole(role: RoleModel): Observable<boolean> {
    return this.secApi.post<boolean>(`/roles`, `"${role.RoleName}"`);
  }

  getUsersInRole(roleName: string): Observable<UserListResultModel> {
    return this.secApi.get<UserListResultModel>(
      `/Users/${roleName}/get-by-role`
    );
  }

  getRolesInUser(userId: string): Observable<string[]> {
    return this.secApi.get<string[]>(`/Users/${userId}/Roles`);
  }

  assignUserToRole(data: {
    roleName: string;
    userId: string;
  }): Observable<boolean> {
    return this.secApi.post<boolean>(
      `/roles/${data.roleName}`,
      `"${data.userId}"`
    );
  }

  removeUserFromRole(data: {
    roleName: string;
    userId: string;
  }): Observable<boolean> {
    return this.secApi.delete<boolean>(
      `/roles/${data.roleName}/RemoveUser?userId=${data.userId}`
    );
  }
}
