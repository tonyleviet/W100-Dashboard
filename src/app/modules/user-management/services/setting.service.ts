import { Injectable } from '@angular/core';

import { BaseType, BaseService } from '@app/core';

export const SETTING_FIELD_MAP = {

}

export class SettingType extends BaseType {

  //Declare class propertise
  email: string = '';
  select: number = null;
  multiSelect: number[] = [];
  textArea: string = '';



  //Declare using Field Map
  protected getFieldMap() {
    return super.getFieldMap(SETTING_FIELD_MAP);
  }
}


function newSettingType(data: object): SettingType {
  return new SettingType().fromData(data);
}

@Injectable()
export class SettingService extends BaseService<SettingType> {

  // List api Url path
  protected baseUrlAddEdit = '';
  protected baseUrlDetail = '';
  protected baseUrlCollection = '';

  // Data propertise of Json response
  protected collectionFieldDataName = '';
  protected typeFieldIDName = '';

  protected newType = (data: object) => newSettingType(data);

}
