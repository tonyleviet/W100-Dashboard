import { Injectable } from "@angular/core";
import { StoreHttpClient } from '@app/modules-services';
import { ServicesType, ServicesModel } from '../_models/services.model';
import { Observable } from 'rxjs';

@Injectable()
export class ServicesService {
  private _urlPath = 'service';

  constructor(
    private _storeApi: StoreHttpClient,
  ) { }

  getAllServices(type: ServicesType = null): Observable<ServicesModel[]> {
    let paramServiceType = '';
    if (type) {
      paramServiceType = `?serviceType=${type}`;
    }
    return this._storeApi.get<ServicesModel[]>(`${this._urlPath}/all${paramServiceType}`);
  }

}
