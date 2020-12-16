import { EnumModel } from '@app/shared/enum/enum';

export class ServicesModel {
  ServiceId: number;
  CompanyId: string;
  ServiceName: string;
  DisplayName: string;
  Description: string;
  DisplayOrder: number;
  IsActive: boolean;
  Type: string;
  ParentId: number;
  ImageUrl: string;

  CreatedBy: string;
  CreatedDate: string;
  ModifiedBy: string;
  ModifiedDate: string;
}

export enum ServicesType {
  systemService = "SystemService",
  customService = "CustomService"
}
export const SERVICE_TYPE_OPTIONS: EnumModel = {
  [ServicesType.systemService]: "System Service",
  [ServicesType.customService]: "Custom Service"
}
