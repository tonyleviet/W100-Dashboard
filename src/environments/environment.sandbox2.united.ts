import { environment } from './environment.base';

//environment.apiUrl = '';
environment.production = false;
environment.environment = 'Sandbox 2 United';
environment.version = '1.0.0';
environment.buildVersion = '0000003';
environment.buildDate = '11/11/2020';

environment.productUrl = 'https://Sandbox2UnitedApi.relationshop.net/v6/product/api';
environment.productFileUrl = 'https://Sandbox2UnitedApi.relationshop.net/v6/asset/api';
environment.storeUrl = 'https://Sandbox2UnitedApi.relationshop.net/V6/store/api/';
environment.orderUrl = 'https://Sandbox2UnitedApi.relationshop.net/V6/order/api/';
environment.customerDXPUrl = 'https://Sandbox2UnitedApi.relationshop.net/V6/dxp/api/';
environment.customerSecUrl = 'https://Sandbox2UnitedApi.relationshop.net/V6/Sec/api/';
environment.activeShoppingBagUrl = 'https://Sandbox2UnitedApi.relationshop.net/V6/cart/api/';
environment.dxpList = 'https://Sandbox2UnitedApi.relationshop.net/v6/dxplist/api';

environment.unitedUrl = 'https://Sandbox2UnitedApi.relationshop.net/v6/dxp/api';
environment.relationShopUrl = 'https://Sandbox2UnitedApi.relationshop.net/v6/dxp/api';
environment.offerUrl = 'https://Sandbox2UnitedApi.relationshop.net/v6/offer/api';
environment.secUrl = 'https://Sandbox2UnitedApi.relationshop.net/v6/sec/api';
environment.centralUrl = 'https://Sandbox2UnitedApi.relationshop.net/v6/central/api';

environment.unitedTempUrl = 'https://Sandbox2UnitedApi.relationshop.net/V6/DXP/api';

environment.distributionUrl = 'https://sandbox2unitedapi.relationshop.net/V6/Distribution/api';

environment.authAccessToken = {
	keyName: "mcmAccessToken",
	username: "UnitedApiUser",
	password: "United2014",
	consumerKey: "199e1034-48e4-4a69-af14-f125a03bd059",
};

export { environment };
