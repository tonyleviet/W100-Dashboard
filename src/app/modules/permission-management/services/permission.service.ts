import { Injectable } from "@angular/core";
import { SecurityHttpClient } from '@app/modules-services';
import { Observable } from 'rxjs';
import { PermissionModel, PermissionMenuModel } from '../_models/permission.model';
import { orderBy } from 'lodash';

@Injectable()
export class PermissionService {
	constructor(
		public secApi: SecurityHttpClient
	) { }

	getPermissions(companyId: string): Observable<PermissionModel[]> {
		return this.secApi.get<PermissionModel[]>(`/Companies/${companyId}/Permissions`);
	}

	update(permissionId: string, data: PermissionModel): Observable<boolean> {
		return this.secApi.put<boolean>(`/Permissions/${permissionId}/Put`, data);
  }

  getMenuPermission(companyId: string, userId: string): Observable<PermissionMenuModel[]> {
    return this.secApi.get<PermissionMenuModel[]>(`/Companies/${companyId}/Users/${userId}/Menu`);
  }

  flat2tree(array: PermissionModel[]): PermissionModel[] {
    const keys = {};
    array.forEach((item: PermissionModel) => {
      keys[item.PermissionId] = item;
    });

    let rootChildren = [];
    array.forEach((item: PermissionModel) => {
      if (!item.ParentId) {
        rootChildren.push(item);
      } else {
        if (!keys[item.ParentId].children) {
          keys[item.ParentId].children = [];
        }
        keys[item.ParentId].children.push(item);
      }
    });
    return rootChildren;
  }

  tree2flat(children: any[], flatArray?: any[], parentName: string = ''): any[] {
    if (!flatArray) {
      flatArray = [];
    }
    children.forEach((item: any) => {
      flatArray.push(item);
      if (parentName){
        item.ParentName = parentName;
      }
      if (!item.children) {
        return;
      }
      const pName = `${parentName}${item.PermissionId}&nbsp;&gt;&gt;&nbsp;`;
      this.tree2flat(item.children, flatArray, pName);
    });
    return flatArray;
  }

  menu2flat(children: PermissionMenuModel[], flatArray?: any[]): PermissionMenuModel[] {
    if (!flatArray) {
      flatArray = [];
    }
    children.forEach((item: PermissionMenuModel) => {
      flatArray.push(item);
      if (item.Children) {
        this.menu2flat(item.Children, flatArray);
      }
    });
    return flatArray;
  }
}
