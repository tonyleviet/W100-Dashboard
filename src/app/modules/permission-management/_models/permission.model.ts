import { Collection } from '@app/core';

export class PermissionModel {
  PermissionId: string;
  Description: string;
  CompanyID: string;
  ModifiedDate: string;
  ModifiedBy: string;
  ParentId?: string;
  ParentName?: string;
  Name?: string;
  Permissions: {
    All: Collection<string>;
    Users: Collection<string>[] | any;
    Roles: Collection<string>[] | any;
    Groups: Collection<string>[] | any;
  };
}

export class PermissionMenuModel{
  MenuId: number;
  Name: string;
  Description: string;
  Url: string;
  Icon: string;
  ParentId: string;
  OrderNumber: number;
  Tag: string;
  PermissionId: string;
  Access: boolean;
  Modify: boolean;
  Archive: boolean;
  CompanyID: string;
  ModifiedDate: string;
  Children: PermissionMenuModel[];
  ChildrenAccess: boolean;
}
