import { environment } from './environment.base';

//environment.apiUrl = '';
environment.production = true;
environment.environment = 'staging Personalization';
environment.version = '0.0.8';
environment.buildVersion = '0000112';
environment.buildDate = '10/09/2020';


environment.productUrl = 'https://qcunitedapi.relationshop.net/v6/product/api';
environment.productFileUrl = 'https://qcunitedapi.relationshop.net/v6/asset/api';
environment.storeUrl = 'https://qcunitedapi.relationshop.net/V6/store/api/';
environment.orderUrl = 'https://qcunitedapi.relationshop.net/V6/order/api/';
environment.customerDXPUrl = 'https://qcunitedapi.relationshop.net/V6/dxp/api/';
environment.customerSecUrl = 'https://qcunitedapi.relationshop.net/V6/Sec/api/';
environment.activeShoppingBagUrl = 'https://qcunitedapi.relationshop.net/V6/cart/api/';
environment.dxpList = 'https://qcunitedapi.relationshop.net/v6/dxplist/api';

environment.unitedUrl = 'https://qcunitedapi.relationshop.net/v6/dxp/api';
environment.relationShopUrl = 'https://QCUnitedAPI.relationshop.net/v6/dxp/api';
environment.offerUrl = 'https://QCUnitedAPI.relationshop.net/v6/offer/api';
environment.secUrl = 'https://QCUnitedAPI.relationshop.net/v6/sec/api';
environment.centralUrl = 'https://QCUnitedAPI.relationshop.net/v6/central/api';

environment.unitedTempUrl = 'https://qcunitedapi.relationshop.net/V5.6/DXP/api'; // Legacy

export { environment };
