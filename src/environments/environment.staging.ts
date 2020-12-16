// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { environment } from './environment.base';

environment.version = '0.0.8';
environment.buildVersion = '00000119'
environment.buildDate = '10/01/2020',


environment.secUrl = 'https://stgapi.relationshop.net/v6/sec/api';
environment.unitedUrl = 'https://stgapi.relationshop.net/v6/dxp/api';
environment.relationShopUrl = 'https://stgapi.relationshop.net/v6/dxp/api';
environment.centralUrl = 'https://stgapi.relationshop.net/v6/central/api';
environment.dxpList = 'https://stgapi.relationshop.net/v6/dxplist/api';
environment.productUrl = 'https://stgapi.relationshop.net/v6/product/api';
environment.offerUrl = 'https://stgapi.relationshop.net/v6/offer/api';
environment.productFileUrl = 'https://stgapi.relationshop.net/v6/asset/api';
environment.storeUrl = 'https://stgapi.relationshop.net/V6/store/api/';
environment.orderUrl = 'https://stgapi.relationshop.net/V6/order/api/';
environment.customerDXPUrl = 'https://stgapi.relationshop.net/V6/dxp/api/';
environment.customerSecUrl = 'https://stgapi.relationshop.net/V6/Sec/api/';
environment.activeShoppingBagUrl = 'https://stgapi.relationshop.net/V6/cart/api/';

environment.unitedTempUrl = 'https://stgapi.relationshop.net/v6/dxp/api';

export { environment };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
