import { environment } from './environment.base';

environment.environment = 'dev Personalization';
environment.version = '0.0.8';
environment.buildVersion = '0000107'
environment.buildDate = '08/14/2020', // mm/dd/yyyy

environment.dxpList = 'https://sandboxapi.relationshop.net/v6/dxplist/api';
environment.productUrl = 'https://sandboxapi.relationshop.net/v6/product/api';
environment.productFileUrl = 'https://sandboxapi.relationshop.net/v6/asset/api';
environment.storeUrl = 'https://sandboxapi.relationshop.net/V6/store/api/';
environment.customerDXPUrl = 'https://sandboxapi.relationshop.net/V6/dxp/api/';
environment.customerSecUrl = 'https://sandboxapi.relationshop.net/V6/Sec/api/';
environment.activeShoppingBagUrl = 'https://sandboxapi.relationshop.net/V6/cart/api/';
environment.orderUrl = 'https://sandboxapi.relationshop.net/V6/order/api/';

environment.unitedUrl = 'https://DevUnitedAPI.relationshop.net/v5.5/dxp/api';
environment.relationShopUrl = 'https://DevUnitedAPI.relationshop.net/v6/dxp/api';
environment.offerUrl = 'https://DevUnitedAPI.relationshop.net/v6/offer/api';
environment.secUrl = 'https://DevUnitedAPI.relationshop.net/v6/sec/api';
environment.centralUrl = 'https://DevUnitedAPI.relationshop.net/v6/central/api';

environment.unitedTempUrl = 'https://DevUnitedAPI.relationshop.net/v5.5/dxp/api'; // Legacy

environment.authAccessToken = {
	keyName: "unitedAccessToken",
	username: "UnitedApiUser",
	password: "United2014",
	consumerKey: "768A49EA-2D05-45A9-AD64-B1BD962138DD",
};

export { environment };
