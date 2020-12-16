// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { environment } from './environment.base';

environment.version = '1.0.0';
environment.environment = 'UAT RS';
environment.buildVersion = '00000108'
environment.buildDate = '10/21/2020',
// environment.defaultCompanyId = '46114288-CEB3-40EA-8637-0C817C1D0B6B';

environment.secUrl = 'https://store-api.relationshop.net/v6/sec/api';
environment.unitedUrl = 'https://store-api.relationshop.net/v6/dxp/api';
environment.relationShopUrl = 'https://store-api.relationshop.net/v6/dxp/api';
environment.centralUrl = 'https://store-api.relationshop.net/v6/central/api';
environment.dxpList = 'https://store-api.relationshop.net/v6/dxplist/api';
environment.productUrl = 'https://store-api.relationshop.net/v6/product/api';
environment.offerUrl = 'https://store-api.relationshop.net/v6/offer/api';
environment.productFileUrl = 'https://store-api.relationshop.net/v6/asset/api';
environment.storeUrl = 'https://store-api.relationshop.net/V6/store/api/';
environment.orderUrl = 'https://store-api.relationshop.net/V6/order/api/';
environment.customerDXPUrl = 'https://store-api.relationshop.net/V6/dxp/api/';
environment.customerSecUrl = 'https://store-api.relationshop.net/V6/Sec/api/';
environment.activeShoppingBagUrl = 'https://store-api.relationshop.net/V6/cart/api/';

environment.unitedTempUrl = 'https://store-api.relationshop.net/v6/dxp/api';

environment.distributionUrl = 'https://store-api.relationshop.net/V6/Distribution/api';

export { environment };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
