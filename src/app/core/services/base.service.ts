import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { BaseType, Collection, BASE_FIELD_MAP } from '@core/types/base.type';

export class SuccessResponse {
  status: number;
  code?: string;
  message?: string;
  data?: any;
  meta?: any;
}

export class ErrorResponse {
  status: number;
  errors?: { [name: string]: string[] };
  code?: string;
  message: string;
  debugMessage?: string;
}


@Injectable()
export abstract class BaseService<Type extends BaseType> {

  // Declare object array
  protected abstract newType: (data: object) => Type;

  constructor(
  ) { }

  clone = (Type: Type): Type => _.cloneDeep(Type);
}
