import { environment } from './environment.base';

//environment.apiUrl = '';
environment.production = false;
environment.environment = 'Staging 2 United';
environment.version = '0.0.1';
environment.buildVersion = '0000004';
environment.buildDate = '11/10/2020';


environment.productUrl = 'https://Stg2Unitedapi.relationshop.net/v6/product/api';
environment.productFileUrl = 'https://Stg2Unitedapi.relationshop.net/v6/asset/api';
environment.storeUrl = 'https://Stg2Unitedapi.relationshop.net/V6/store/api/';
environment.orderUrl = 'https://Stg2Unitedapi.relationshop.net/V6/order/api/';
environment.customerDXPUrl = 'https://Stg2Unitedapi.relationshop.net/V6/dxp/api/';
environment.customerSecUrl = 'https://Stg2Unitedapi.relationshop.net/V6/Sec/api/';
environment.activeShoppingBagUrl = 'https://Stg2Unitedapi.relationshop.net/V6/cart/api/';
environment.dxpList = 'https://Stg2Unitedapi.relationshop.net/v6/dxplist/api';

environment.unitedUrl = 'https://Stg2Unitedapi.relationshop.net/v6/dxp/api';
environment.relationShopUrl = 'https://Stg2Unitedapi.relationshop.net/v6/dxp/api';
environment.offerUrl = 'https://Stg2Unitedapi.relationshop.net/v6/offer/api';
environment.secUrl = 'https://Stg2Unitedapi.relationshop.net/v6/sec/api';
environment.centralUrl = 'https://Stg2Unitedapi.relationshop.net/v6/central/api';

environment.unitedTempUrl = 'https://Stg2Unitedapi.relationshop.net/v6/dxp/api';

environment.distributionUrl = 'https://Stg2Unitedapi.relationshop.net/V6/Distribution/api';

environment.authAccessToken = {
	keyName: "mcmAccessToken",
	username: "UnitedApiUser",
	password: "United2014",
	consumerKey: "768A49EA-2D05-45A9-AD64-B1BD962138DD",
};

export { environment };
