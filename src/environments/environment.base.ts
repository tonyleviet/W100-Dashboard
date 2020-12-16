export const environment = {
  unitedUrl: 'localhost',
  unitedTempUrl: 'localhost',
  relationShopUrl: 'localhost',
  secUrl: 'localhost',
  centralUrl: 'localhost',
  dxpList: 'localhost',
  productUrl: 'localhost',
  productFileUrl: 'localhost',
  storeUrl: 'localhost',
  orderUrl: 'localhost',
  customerDXPUrl: 'localhost',
  customerSecUrl: 'localhost',
  offerUrl: 'localhost',
  activeShoppingBagUrl: 'localhost',
  distributionUrl: 'localhost',

  version: '0.0.8',
  buildVersion: '0000106',
  buildDate: '09/17/2020', // mm/dd/yyyy

  environment: 'dev',
  production: false,

  isMockEnabled: true, // You have to switch this, when your real back-end is done
  defaultCompanyId: 'A91F6788-BBE6-4ED3-8BB9-647C10ECEECA',
  defaultImage: '/assets/img/default-image.jpg',
  authAccessToken: {
    keyName: 'mcmAccessToken',
    username: 'rsapiuser',
    password: 'rsef2019',
    consumerKey: '199e1034-48e4-4a69-af14-f125a03bd059'
  },

  // Legacy
  unitedAccessToken: {
    keyName: "unitedAccessToken",
    username: "UnitedApiUser",
    password: "United2014",
    consumerKey: "768A49EA-2D05-45A9-AD64-B1BD962138DD",
  },
  // End legacy
  bitly: {
    url: 'https://api-ssl.bitly.com/v4/',
    login: 'relationshop2x',
    accessToken: '28a9e03369334d402b5d3011f6d5889ffcd348c6'
  },
  companiesEmail: {
    '0cf5abe1-53fd-4caf-80a2-9dfafe10e828': [
      {
        value: 'DXP Workbench|noreply@relationshop.com',
        text: 'DXP Workbench <noreply@relationshop.com>'
      }
    ],
    'a91f6788-bbe6-4ed3-8bb9-647c10eceeca': [
      {
        value: 'DXP Workbench|noreply@relationshop.com',
        text: 'DXP Workbench <noreply@relationshop.com>'
      }
    ],
    'c5b112c5-2790-4c86-8189-c5510723867c': [
      {
        value: 'GoAwayFarm |gtmcm@mcmgo.com',
        text: 'GoAwayFarm <gtmcm@mcmgo.com>'
      }
    ],
    '08226166-945d-47c8-8b33-52ba0fc3a230': [
      {
        value: 'ARedStore.com|noreply@aredstore.com',
        text: 'ARedStore.com <noreply@aredstore.com>'
      }
    ],
    '2f2e785b-18c5-44db-9929-e58c3d5e13e6': [
      {
        value: 'GoThink Demo|gtmcm@mcmgo.com',
        text: 'GoThink Demo <gtmcm@mcmgo.com>'
      }
    ],
    '58308ce9-c621-45d0-8bc5-3111f1a1477f': [
      {
        value: 'Save Smart Rewards|sml-noreply@myrelationshop.com',
        text: 'Save Smart Rewards <sml-noreply@myrelationshop.com>'
      },
      {
        value: 'Lucky You Rewards|sml-noreply@myrelationshop.com',
        text: 'Lucky You Rewards <sml-noreply@myrelationshop.com>'
      },
      {
        value: 'Lucky California|sml-noreply@myrelationshop.com',
        text: 'Lucky California <sml-noreply@myrelationshop.com>'
      }
    ],
    '9308c843-65dc-4f2b-b32d-8d6470806c4a': [
      {
        value: 'MCM Central QC|gtmcm@mcmgo.com',
        text: 'MCM Central QC <gtmcm@mcmgo.com>'
      }
    ],
    'fcbc39b8-55ac-444a-9586-8843a12bcec7': [
      {
        value: 'BigY|gtmcm@mcmgo.com',
        text: 'BigY <gtmcm@mcmgo.com>'
      }
    ],
    'e0822141-0cfe-46ad-8a90-4e9529f7d791': [
      {
        value: 'Gothink Retail|gothinkmarket@gothinkapps.com',
        text: 'Gothink Retail <gothinkmarket@gothinkapps.com>'
      }
    ]
  },
  paymentGateway: {
    stripe: {
      publicKey: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
    }
  },
  // Local storage key
  allStoresKey: 'allStores',
  allCustomServices: 'customServices'
};
