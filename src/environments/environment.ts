// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { environment } from './environment.base';

environment.secUrl = 'https://dev1-api.relationshop.net/v6/sec/api';
environment.unitedUrl = 'https://dev1-api.relationshop.net/v6/dxp/api';
environment.relationShopUrl = 'https://dev1-api.relationshop.net/v6/dxp/api';
environment.centralUrl = 'https://dev1-api.relationshop.net/v6/central/api';
environment.dxpList = 'https://dev1-api.relationshop.net/v6/dxplist/api';
environment.productUrl = 'https://dev1-api.relationshop.net/v6/product/api';
environment.offerUrl = 'https://dev1-api.relationshop.net/v6/offer/api';
environment.productFileUrl = 'https://dev1-api.relationshop.net/v6/asset/api';
environment.storeUrl = 'https://dev1-api.relationshop.net/V6/store/api/';
environment.orderUrl = 'https://dev1-api.relationshop.net/V6/order/api/';
environment.customerDXPUrl = 'https://dev1-api.relationshop.net/V6/dxp/api/';
environment.customerSecUrl = 'https://dev1-api.relationshop.net/V6/Sec/api/';
environment.activeShoppingBagUrl = 'https://dev1-api.relationshop.net/V6/cart/api/';

environment.unitedTempUrl = 'https://dev1-api.relationshop.net/v6/dxp/api';

export { environment };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
