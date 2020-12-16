import { environment } from "./environment.base";

environment.production = true;
environment.environment = "Store G1";

environment.version = "0.0.1";
environment.buildVersion = "0000002";
environment.buildDate = "11/11/2020"; // mm/dd/yyyy

environment.secUrl = "https://store-api.relationshop.net/v6/sec/api";
environment.unitedUrl = "https://store-api.relationshop.net/V6/dxp/api";
environment.relationShopUrl = "https://store-api.relationshop.net/v6/dxp/api";
environment.centralUrl = "https://store-api.relationshop.net/v6/central/api";
environment.dxpList = "https://store-api.relationshop.net/v6/dxplist/api";
environment.productUrl = "https://store-api.relationshop.net/v6/product/api";
environment.offerUrl = "https://store-api.relationshop.net/v6/offer/api";
environment.productFileUrl = "https://store-api.relationshop.net/v6/asset/api";
environment.storeUrl = "https://store-api.relationshop.net/V6/store/api/";
environment.orderUrl = "https://store-api.relationshop.net/V6/order/api/";
environment.customerDXPUrl = "https://store-api.relationshop.net/V6/dxp/api/";
environment.customerSecUrl = "https://store-api.relationshop.net/V6/Sec/api";
environment.activeShoppingBagUrl =
  "https://store-api.relationshop.net/V6/cart/api/";

environment.unitedTempUrl = "https://store-api.relationshop.net/v6/dxp/api";

environment.distributionUrl =
  "https://store-api.relationshop.net/V6/Distribution/api";

// environment.authAccessToken = {
// 	keyName: "mcmAccessToken",
// 	username: "UnitedApiUser",
// 	password: "United2014",
// 	consumerKey: "199e1034-48e4-4a69-af14-f125a03bd059",
// };

export { environment };
