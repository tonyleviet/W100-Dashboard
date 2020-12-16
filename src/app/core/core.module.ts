import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RequestInterceptor } from './interceptors/request.interceptor';
import { CacheInterceptor } from './interceptors/cache.interceptor';

import { CORE_COMPONENTS, CORE_TYPES, CORE_SERVICES, CORE_VIEWS } from '@core/index';

@NgModule({
  imports:      [ CommonModule, FormsModule, HttpClientModule ],
  declarations: [ CORE_COMPONENTS, CORE_VIEWS ],
  exports:      [ ],
  providers:    [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    CORE_TYPES, CORE_SERVICES,
    {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi:true},
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
