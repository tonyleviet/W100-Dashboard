export class PageConfig {
  public defaults: any = {
    dashboard: {
      page: {
        title: "",
        desc: "Latest updates and statistic charts"
      }
    },
    ecommerce: {
      customers: {
        page: { title: "Customers", desc: "" }
      },
      products: {
        edit: {
          page: { title: "Edit product", desc: "" }
        },
        add: {
          page: { title: "Create product", desc: "" }
        }
      },
      orders: {
        detail: {
          page: { title: "Orders", desc: "" }
        },
      }
    },
    "user-management": {
      users: {
        page: { title: "User Management", desc: "" },
        param: {
          edit: {
            page: { id: "#:id", title: "User Management", desc: "" },
          }
        }
      }
    },
    "permission-management": {
      permissions: {
        page: { title: "Permission Management", desc: "" }
      }
    },
    "role-management": {
      roles: {
        page: { title: "Role Management", desc: "" },
        param: {
          users: {
            page: { id: "#:id", title: "Role Management - Users Assigned", desc: "" },
          }
        }
      },
      users: {
        page: { title: "Role Users", desc: "" }
      }
    },
    "e-marketing": {
      campaigns: {
        page: { title: "Campaigns", desc: "" }
      },
      template: {
        sms: {
          home: {
            page: { title: "SMS Template", desc: "" }
          }
        },
        email: {
          home: {
            page: { title: "Email Template", desc: "" }
          }
        }
      },
      segmentation: {
        wizard: {
          page: { title: "Segmentation Wizard", desc: "" }
        }
      },
      'micro-segment': {
        home: {
          page: { title: "Micro-Segment", desc: "" }
        },
        wizard: {
          page: { title: "Segmentation Wizard", desc: "" }
        }
      },
      'adhoc-list': {
        home: {
          page: { title: 'List Management', desc: '' }
        },
        wizard: {
          page: { title: 'Ad-hoc Wizard', desc: '' }
        }
      },
      'rfm-list': {
        home: {
          page: { title: 'RFM List Management', desc: '' }
        },
      },
      program: {
        home: {
          page: { title: "Program Management", desc: "" }
        },
        new: {
          page: { title: "New Program", desc: "" }
        },
        param: {
          edit: {
            page: { id: "#:id", title: "Edit Program", desc: "" },
          }
        }
      },
    },
    'dxp-commerce': {
      categories: {
        page: { title: 'Categories', desc: '' }
      },
      products: {
        page: { title: 'Products', desc: '' }
      },
      'product-options': {
        page: { title: 'Options', desc: '' }
      },
      collections : {
        page: { title: 'Collections', desc: '' }
      },
      brands : {
        page: { title: 'Brands', desc: '' }
      },
      stores: {
        page: { title: 'Stores', desc: '' }
      },
      customers: {
        page: { title: 'Customers', desc: '' }
      },
      taxes: {
        page: { title: 'Taxes', desc: '' }
      },
      orders: {
        page: { title: 'Orders', desc: '' }
      }
    },
    'scan-go': {
      dashboard: {
        page: { title: 'Dashboard', desc: '' }
      },
      products: {
        page: { title: 'Products', desc: '' }
      },
      orders: {
        page: { title: 'Orders', desc: '' }
      },
      'active-shopping-bags': {
        page: { title: 'Active Shopping Bags', desc: '' }
      }
    },
    catering: {
      dashboard: {
        page: { title: 'Dashboard', desc: '' }
      },
      products: {
        page: { title: 'Products', desc: '' }
      },
      orders: {
        page: { title: 'Orders', desc: '' }
      },
    },
    customers: {
      customers: {
        page: { title: 'Customers', desc: '' }
      }
    },
    promotion: {
      home: {
        page: { title: "Promotion Management", desc: "" }
      },
      param: {
        detail: {
          page: { id: "#:id", title: "Promotion details", desc: "" },
        }
      },
      offer: {
        list: {
          page: { title: "Offer Management", desc: "" }
        }
      },
      campaign: {
        list: {
          page: { title: "Campaign  Management", desc: "" }
        }
      },
    },
    error: {
      404: {
        page: { title: "404 Not Found", desc: "", subheader: false }
      },
      403: {
        page: { title: "403 Access Forbidden", desc: "", subheader: false }
      }
    }
  };

  public get configs(): any {
    return this.defaults;
  }
}
