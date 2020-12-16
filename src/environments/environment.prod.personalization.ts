import { environment } from './environment.base';

//environment.apiUrl = '';
environment.production = true;
environment.environment = 'Production Personalization';
environment.version = '1.0.0';
environment.buildVersion = '0000003';
environment.buildDate = '11/16/2020';


environment.productUrl = 'https://store-api.relationshop.net/v6/product/api';
environment.productFileUrl = 'https://unitedapi.relationshop.net/v6/asset/api';
environment.storeUrl = 'https://store-api.relationshop.net/V6/store/api/';
environment.orderUrl = 'https://store-api.relationshop.net/V6/order/api/';
environment.customerDXPUrl = 'https://store-api.relationshop.net/V6/dxp/api/';
environment.customerSecUrl = 'https://store-api.relationshop.net/V6/Sec/api/';
environment.activeShoppingBagUrl = 'https://store-api.relationshop.net/V6/cart/api/';
environment.dxpList = 'https://store-api.relationshop.net/v6/dxplist/api';

environment.unitedUrl = 'https://unitedapi.relationshop.net/v6/dxp/api';
environment.relationShopUrl = 'https://unitedapi.relationshop.net/v6/dxp/api';
environment.offerUrl = 'https://unitedapi.relationshop.net/v6/offer/api';
environment.secUrl = 'https://unitedapi.relationshop.net/v6/sec/api';
environment.centralUrl = 'https://unitedapi.relationshop.net/v6/central/api';

environment.unitedTempUrl = 'https://unitedapi.relationshop.net/V5.7/api';

export { environment };
